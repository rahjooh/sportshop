interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    actions?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, eyebrow, actions }: SectionHeaderProps): JSX.Element {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                {eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">{eyebrow}</p>
                )}
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {actions}
        </div>
    );
}
