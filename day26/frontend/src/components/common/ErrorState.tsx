type ErrorStateProps = {
    message: string
    onRetry: () => void
}

export default function ErrorState({
    message,
    onRetry
}: ErrorStateProps) {
    return(
        <div role="alert" className="error-state">
            <h2>Something went wrong.</h2>
            <p>{message}</p>
            <button onClick={onRetry}>
                Try again
            </button>
        </div>
    )
}