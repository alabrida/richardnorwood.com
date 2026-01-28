export function LandingPreview({ html }: { html: string }) {
    return (
        <iframe
            srcDoc={html}
            className="w-full h-full border-none"
            title="Landing Page Preview"
        />
    );
}
