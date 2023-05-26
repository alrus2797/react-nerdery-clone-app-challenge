import { useCallback, useEffect, useState } from 'react';

function instantiateError(error: unknown) {
  let thisWillBeAnError;
  if (error instanceof Error) thisWillBeAnError = error;
  else thisWillBeAnError = Error(String(error));
  return thisWillBeAnError;
}

export const useAsync = <T, A>(
  asyncFunction: (args?: A) => Promise<T>,
  args?: A,
) => {
  const [value, setValue] = useState<T | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reSync = useCallback(() => {
    setPending(true);
    setError(null);
    return asyncFunction(args)
      .then(response => {
        setValue(response);
      })
      .catch(promiseError => {
        setError(instantiateError(promiseError));
      })
      .finally(() => {
        setPending(false);
      });
  }, [asyncFunction, args]);

  useEffect(() => {
    reSync();
  }, [reSync]);

  return { value, pending, error, setValue, reSync };
};
