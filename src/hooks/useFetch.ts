import React from "react"

export default function useFetch<Response>(url: RequestInfo | URL, options?: RequestInit) {
    const [data, setData] = React.useState<Response | null>(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const optionsRef = React.useRef(options)
    optionsRef.current = options

    function isAborted(controller: AbortController): boolean {
        return controller.signal.aborted
    }

    function nonAborted(controller: AbortController): boolean {
        return isAborted(controller) === false
    } 

    React.useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true);
            setData(null);

            try {
                const responseCall = await fetch(url, {
                    signal: controller.signal,
                    ...optionsRef.current,
                });
                
                if (!responseCall.ok) {
                    throw new Error(`Error: ${responseCall.status}`)
                }

                const json = (await responseCall.json()) as Response
                
                if (nonAborted(controller)) {
                    setData(json)
                }

            } catch (error) {
                if (nonAborted(controller) && error instanceof Error) {
                    setError(error.message)
                }

            } finally {
                if (nonAborted(controller)) {
                    setLoading(false)
                }
            }
        }
          
        fetchData();
    
        return () => {
            controller.abort();
            setData(null)
            setLoading(false)
            setError(null)
        };
    }, [url])

    return { data, loading, error }

}