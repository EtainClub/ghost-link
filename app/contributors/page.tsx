import type { Metadata } from 'next';
import ContributorsClient from './ContributorsClient';
import { getLedger } from './github';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Architects — Ghost Link',
    description: 'The real people building the interface for a job that does not exist yet.',
};

export default async function ContributorsPage() {
    const ledger = await getLedger();
    return <ContributorsClient ledger={ledger} />;
}
