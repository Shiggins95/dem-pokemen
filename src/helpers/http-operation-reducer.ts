/* eslint-disable no-unused-vars */
import React, { Reducer, ReducerState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AsyncActionHandlers, useReducerAsync } from 'use-reducer-async';
import { getHttpStatusCategory, NHttpStatuses } from 'http-response-status';

export enum ServiceErrorKind {
    Unknown = 'Unknown',
    UnAuthorised = 'Unauthorised',
    ServiceFailure = 'ServiceFailure',
    ClientError = 'ClientError',
    Timeout = 'Timeout',
    Aborted = 'Aborted',
}

export interface ServiceFailure {
    kind: ServiceErrorKind.ServiceFailure;
    code: NHttpStatuses.EServerError;
}

export interface ClientError {
    kind: ServiceErrorKind.ClientError;
    code: NHttpStatuses.EClientError;
}

export interface Timeout {
    kind: ServiceErrorKind.Timeout;
}

export interface Aborted {
    kind: ServiceErrorKind.Aborted;
}

export interface UnknownError {
    kind: ServiceErrorKind.Unknown;
    error: Error;
}

export interface NotAuthorisedError {
    kind: ServiceErrorKind.UnAuthorised;
}

export type OperationError =
    | UnknownError
    | NotAuthorisedError
    | ClientError
    | ServiceFailure
    | Timeout
    | Aborted;

export enum OperationKind {
    none = 'none',
    inProgress = 'inProgress',
    failed = 'failed',
    complete = 'complete',
}

export enum EffectType {
    Nop = 'Nop',
    Effect = 'Effect',
}

export type Effect =
    | { type: EffectType.Nop }
    | { type: EffectType.Effect; effect: () => void };

export type Operation<T> =
    | { type: OperationKind.none; effect: Effect }
    | { type: OperationKind.inProgress; effect: Effect }
    | { type: OperationKind.failed; error: OperationError; effect: Effect }
    | { type: OperationKind.complete; value: T; effect: Effect };

const runEffect = <T>(operation: Operation<T>): void => {
    switch (operation.effect.type) {
        case EffectType.Effect: {
            operation.effect.effect();
        }
    }
};

const hasEffect = <T>(
    operation: Operation<T>,
    effect: () => void,
): Operation<T> => ({
    ...operation,
    effect: { type: EffectType.Effect, effect },
});

export type OpPromise<T> = () => Promise<AxiosResponse<T>>;

interface Action<T> {
    type: 'PERFORM_OPERATION';
    operation: OpPromise<T>;
}

const handleHttp = async <T, T2>(
    dispatch: React.Dispatch<Operation<T2>>,
    action: Action<T>,
) => {
    try {
        const response = await action.operation();
        dispatch({
            type: OperationKind.complete,
            value: response.data as unknown as T2,
            effect: { type: EffectType.Nop },
        });
    } catch (e) {
        console.log('ERROR WITH REQUEST', e);
        if (axios.isCancel(e)) {
            return dispatch({
                type: OperationKind.failed,
                error: { kind: ServiceErrorKind.Aborted },
                effect: { type: EffectType.Nop },
            });
        }

        if (axios.isAxiosError(e)) {
            const axiosError = e as unknown as AxiosError<T>;

            if (axiosError.code === 'ECONNABORTED') {
                return dispatch({
                    type: OperationKind.failed,
                    error: { kind: ServiceErrorKind.Timeout },
                    effect: { type: EffectType.Nop },
                });
            }

            const statusCode = Number(axiosError.response?.status);
            switch (getHttpStatusCategory(statusCode)) {
                case 'ClientError': {
                    if (
                        statusCode === NHttpStatuses.EClientError.UNAUTHORIZED
                    ) {
                        return dispatch({
                            type: OperationKind.failed,
                            error: { kind: ServiceErrorKind.UnAuthorised },
                            effect: { type: EffectType.Nop },
                        });
                    } else {
                        return dispatch({
                            type: OperationKind.failed,
                            error: {
                                kind: ServiceErrorKind.ClientError,
                                code: statusCode,
                            },
                            effect: { type: EffectType.Nop },
                        });
                    }
                }
                case 'ServerError': {
                    return dispatch({
                        type: OperationKind.failed,
                        error: {
                            kind: ServiceErrorKind.ServiceFailure,
                            code: statusCode,
                        },
                        effect: { type: EffectType.Nop },
                    });
                }
            }
        }
        console.log('Unknown error', e);
        dispatch({
            type: OperationKind.failed,
            error: {
                kind: ServiceErrorKind.Unknown,
                error: Error(e as string),
            },
            effect: { type: EffectType.Nop },
        });
    }
};

const actionHandlers = <T, T2>(): AsyncActionHandlers<
    Reducer<Operation<T2>, Operation<T2>>,
    Action<T>
> => ({
    PERFORM_OPERATION:
        ({ dispatch, signal }) =>
        async (action) => {
            const guardedDispatch = (op: Operation<T2>): void => {
                dispatch(op);
            };
            guardedDispatch({
                type: OperationKind.inProgress,
                effect: { type: EffectType.Nop },
            });
            await handleHttp(guardedDispatch, action);
        },
});

type R<T2> = (previous: Operation<T2>, next: Operation<T2>) => Operation<T2>;

export type HttpOperation<T, T2 = T> = [
    ReducerState<Reducer<Operation<T2>, Operation<T2>>>,
    (op: OpPromise<T>) => void,
];

export type NonNullableProperties<T> = {
    [P in keyof T]?: NonNullable<T[P]>;
};

export type DeepNonNullable<T> = Required<NonNullableProperties<T>>;

// Get a reducer that will produce a model of an http operation in flight and completed, with error states handled
const httpOperationReducer = <T, T2 = T>(
    reducer: R<T2> = (_previous, next) => next,
): HttpOperation<T, T2> => {
    const initialState: Operation<T2> = {
        type: OperationKind.none,
        effect: { type: EffectType.Nop },
    };

    const [state, dispatch] = useReducerAsync(
        reducer,
        initialState,
        actionHandlers<T, T2>(),
    );

    useEffect(() => {
        runEffect(state);
    }, [state]);

    return [
        state,
        (op) => dispatch({ type: 'PERFORM_OPERATION', operation: op }),
    ];
};

export { httpOperationReducer, hasEffect, runEffect };
