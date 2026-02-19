import { useEffect, useState } from 'react';
import { Sidebar } from '~/components/molecules/sidebar';
import { useNavigation } from '~/hooks/useNavigation';
import { useParams } from 'react-router';
import { useCandidatesProfile } from '~/features/candidates/hooks/useCandidatesProfile';
import { CandidateProfileCard } from '~/components/molecules/candidate-profile/candidate-profile-card';
import { useCandidateProfile } from '~/features/candidates/hooks/useCandidateDetailCard';
import { EducationHistoryCard } from '~/components/molecules/candidate-profile/education-history-card';
import { FinancialSummary } from '~/components/molecules/candidate-profile/financial-summary';
import { useFinancialSummary } from '~/features/candidates/hooks/useFinancialSummary';
import { usePanItrTable } from '~/features/candidates/hooks/usePanItr';
import { DataTableCard } from '~/components/molecules/data-table-card';
import { useCandidateMovableAssets } from '~/features/candidates/hooks/useCandidateMovableAssets';
import { useCandidateLiabilities } from '~/features/candidates/hooks/useCandidateLiabilities';
import { useCandidateImmovableAssets } from '~/features/candidates/hooks/useCandidateImmovableAsset';
import { useCandidateCriminalCases } from '~/features/candidates/hooks/useCandidateCriminalCases';
import { cn } from '~/lib/utils';
// import { useCandidateEducation } from '~/features/candidates/hooks/useCandidateEducation';
// MAIN PAGE COMPONENT 
export default function CandidateProfile() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { id } = useParams<{ id: string }>();
    const { candidate, loading, loadCandidate } = useCandidatesProfile();
    const { identity, metaDetails } = useCandidateProfile(candidate);
    // const { education } = useCandidateEducation(candidate);
    const financialSummaryData = useFinancialSummary(candidate);
    const { rows: panItrRows, columns: panItrColumns } = usePanItrTable(candidate);
    const { rows: movableRows, columns: movableCols } = useCandidateMovableAssets(candidate);
    const { rows: immovableRows, columns: immovableCols } = useCandidateImmovableAssets(candidate);
    const { rows: liabilitiesRows, columns: liabilitiesCols } = useCandidateLiabilities(candidate);
    const criminalSections = useCandidateCriminalCases(candidate);

    useEffect(() => {
        if (id) {
            loadCandidate(Number(id));
        }
    }, [id, loadCandidate]);

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
            <Sidebar
                navItems={navItems}
                activeNavId="candidates"
                onNavChange={onNavChange}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            <main className={cn(
                "min-h-screen p-8 transition-[padding-left] duration-200",
                sidebarOpen ? "pl-60" : "pl-20"
            )}>
                <div className="mx-auto max-w-[1400px] space-y-8">

                    <CandidateProfileCard
                        identity={identity}
                        metaDetails={metaDetails}
                    />
                    {/* replace with the education history data from the candidate profile using a hook */}
                    <EducationHistoryCard
                        items={[
                            { degree: "M.A. Political Science", institution: "Banaras Hindu University (BHU), Varanasi", year: "1994" },
                            { degree: "B.A. (Hons) Pol. Science", institution: "Banaras Hindu University (BHU), Varanasi", year: "1992" },
                            { degree: "Senior Secondary (Class XII)", institution: "U.P. Board Allahabad", year: "1989" },
                            { degree: "Secondary (Class X)", institution: "U.P. Board Allahabad", year: "1987" },
                        ]}
                    />

                    {/* Timeline Tabs */}
                    {/* will be implemented once the timeline data is available in the backend 
                    need to fetch the available years from the candidate profile
                    and available data for each year
                    along with a hook to fetch the data for each year*/}
                    <div className="flex items-center justify-center">
                        <div className="inline-flex p-1 bg-slate-200/50 rounded-lg border border-slate-200">
                            <button className="px-8 py-1.5 text-xs font-bold rounded-md transition-all text-slate-500 hover:text-slate-800">2014</button>
                            <button className="px-8 py-1.5 text-xs font-bold rounded-md transition-all text-slate-500 hover:text-slate-800">2019</button>
                            <button className="px-8 py-1.5 text-xs font-bold rounded-md transition-all bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">2024</button>
                        </div>
                    </div>


                    {/* Financial Summary */}
                    <FinancialSummary
                        assets={financialSummaryData.assets}
                        liabilities={financialSummaryData.liabilities}
                        netWorth={financialSummaryData.netWorth}
                    />

                    {/* PAN & ITR */}
                    <DataTableCard
                        title="PAN & ITR Disclosures"
                        subtitle="Election Cycle: 2024"
                        columns={panItrColumns}
                        rows={panItrRows}
                    />

                    {/* Chart will be implemented once the net worth growth trajectory data is available in the backend*/}
                    {/* <Card className="p-6">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-8">Net Worth Growth Trajectory (2014-2024)</h3>
                                <div className="relative h-64 flex items-end justify-between px-10">
                                    <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                                        <div className="border-t border-slate-100 w-full" />
                                        <div className="border-t border-slate-100 w-full" />
                                        <div className="border-t border-slate-100 w-full" />
                                        <div className="border-t border-slate-100 w-full" />
                                    </div>
                                    <BarChartBar val="₹1.1 Cr" year="2014" h="h-32" bg="bg-blue-600/40" text="text-slate-500" />
                                    <BarChartBar val="₹1.8 Cr" year="2019" h="h-48" bg="bg-blue-600/60" text="text-slate-500" />
                                    <BarChartBar val="₹2.5 Cr" year="2024" h="h-60" bg="bg-blue-600" text="text-blue-600" />
                                </div>
                            </Card> */}


                    {/* Detailed Wealth Breakdown */}
                    <DataTableCard
                        title="Movable Assets"
                        columns={movableCols}
                        rows={movableRows}
                    />
                    <DataTableCard
                        title="Immovable Assets"
                        columns={immovableCols}
                        rows={immovableRows}
                    />
                    <DataTableCard
                        title="Liabilities"
                        columns={liabilitiesCols}
                        rows={liabilitiesRows}
                    />
                    {criminalSections.map((section) => (
                        <DataTableCard
                            key={section.label}
                            title={section.label}
                            columns={section.columns}
                            rows={section.rows}
                        />
                    ))}

                </div>
            </main>
        </div>
    );
}



