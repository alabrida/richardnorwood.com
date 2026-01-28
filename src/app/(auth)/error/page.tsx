
export default function ErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Something went wrong</h1>
                <p className="mt-2 text-zinc-400">Please try again later.</p>
                <a href="/login" className="mt-6 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200">Back to Login</a>
            </div>
        </div>
    )
}
