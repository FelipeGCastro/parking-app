import { useTranslate, t } from 'react-polyglot'

const usePolyglot = (prefix?: string) => {
  const t: t = useTranslate()
  return (key: string, args?: Record<string, string>) =>
    t([prefix, key].filter(s => s).join('.'), args)
}

export default usePolyglot
