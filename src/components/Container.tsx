export default function Container ({ children } :  {children: React.ReactNode}) {
    return (
        <div className="flex justify-center min-h-screen px-3 py-0">
            <div className="w-full max-w-3xl">
                {children}
            </div>
        </div>
    )
}