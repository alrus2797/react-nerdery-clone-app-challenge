import { useCallback, useEffect, useMemo, useState } from 'react';

function instantiateError(error: unknown) {
  let thisWillBeAnError;
  if (error instanceof Error) thisWillBeAnError = error;
  else thisWillBeAnError = Error(String(error));
  return thisWillBeAnError;
}

type AsyncFunction<T, A extends unknown[]> = (...args: A) => Promise<T>;

export const useAsync = <T, A extends unknown[]>(
  asyncFunction: AsyncFunction<T, A>,
  ...args: A
) => {
  const [value, setValue] = useState<T | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reSync = useCallback(
    (...reSyncArg: A) => {
      setPending(true);
      setError(null);
      return asyncFunction(...reSyncArg)
        .then(response => {
          setValue(response);
        })
        .catch(promiseError => {
          setError(instantiateError(promiseError));
        })
        .finally(() => {
          setPending(false);
        });
    },
    [asyncFunction],
  );

  useEffect(() => {
    reSync(...args);
  }, [reSync]);

  return { value, pending, error, setValue, reSync };
};
