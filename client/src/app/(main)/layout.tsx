import Header from '@/components/header_component';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />

            <div className="px-[250px]">{children}</div>
        </div>
    );
}
