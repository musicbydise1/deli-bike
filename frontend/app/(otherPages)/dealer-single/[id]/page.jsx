import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import DealerSingle from "@/components/otherPages/DealerSingle";
import { dealers } from "@/data/dealers";
import React from "react";

export const metadata = {
    title: "Вакансии",
    description: "",
};

export async function generateStaticParams() {
    return dealers.map((dealer) => ({ id: dealer.id.toString() }));
}

export default function DealerSinglePage({ params }) {
    const dealerItem = dealers.find((elm) => elm.id == params.id) || dealers[0];

    return (
        <>
            <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
            <DealerSingle dealerItem={dealerItem} />
            <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
        </>
    );
}