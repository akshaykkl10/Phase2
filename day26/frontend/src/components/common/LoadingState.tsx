type LoadingStateProps = {
    message?: string
}

export default function LoadingState({message= 'Loading...'}: LoadingStateProps) {
    return (
        <div role="status" aria-live="polite">
            <p>{message}</p>
        </div>
    )
}