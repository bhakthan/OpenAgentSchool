import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BusinessUseCaseProps {
  industry: string;
  scenario: string;
  value: string;
}

const BusinessUseCaseSection: React.FC<BusinessUseCaseProps> = ({ industry, scenario, value }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Business Use Case</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div><strong>Industry:</strong> {industry}</div>
        <div><strong>Scenario:</strong> {scenario}</div>
        <div><strong>Value:</strong> {value}</div>
      </div>
    </CardContent>
  </Card>
);

export default BusinessUseCaseSection;
