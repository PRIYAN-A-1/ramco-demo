import { UserProfile } from '../types';
import { FinancialEngine } from './financialEngine';

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp?: string;
}

export const GeminiAiEngine = {
  async askFinancialAdvisor(prompt: string, profile: UserProfile): Promise<string> {
    const p = prompt.toLowerCase();

    // Emulate intelligent financial reasoning with live family numbers
    if (p.includes('saving') || p.includes('increase') || p.includes('surplus')) {
      return `Based on your monthly inflow of ${FinancialEngine.formatINR(
        profile.monthlyIncome
      )} and current expenses of ${FinancialEngine.formatINR(
        profile.monthlyExpenses
      )}, your household is saving ${FinancialEngine.formatINR(
        profile.monthlySavings
      )} (a strong 41.1% savings rate).

Here is how you can boost it further:
1. **Discretionary Food Cap**: You're projected to spend ₹8,400 on Food & Dining. Shifting to home-cooked meals 2 days a week saves ~₹2,200/mo.
2. **Auto-Sweep to High Yield FD**: Auto-sweep any surplus above ₹50,000 in your savings account into 7.2% interest sweeps.
3. **Utility Bundling**: Consolidate broadband and mobile postpaids under an Airtel Black family plan to save ₹350/mo.`;
    }

    if (p.includes('emergency') || p.includes('buffer') || p.includes('safety')) {
      const months = (profile.emergencyFund / profile.monthlyExpenses).toFixed(1);
      return `Your current Emergency Reserve Fund holds **${FinancialEngine.formatINR(
        profile.emergencyFund
      )}**, which covers **${months} months** of essential household expenses (${FinancialEngine.formatINR(
        profile.monthlyExpenses
      )}/mo).

• **Standard Benchmark**: We recommend maintaining 6 months of mandatory expenses (~₹2,30,000).
• **Action Step**: Channel ₹4,000/month from monthly savings into your Emergency Reserve goal to reach full 6-month resilience within 12 months.`;
    }

    if (p.includes('japan') || p.includes('vacation') || p.includes('travel') || p.includes('trip')) {
      return `**Japan Family Vacation Runway Plan**:
• **Target Goal**: ₹2,50,000 by May 2027.
• **Current Saved**: ₹68,000 (27.2% achieved).
• **Remaining**: ₹1,82,000 across 9 months.
• **Required Monthly SIP**: ₹20,200/month in an Arbitrage/Liquid fund.
With your current monthly surplus of ${FinancialEngine.formatINR(
        profile.monthlySavings
      )}, you can comfortably allocate ₹18,000–₹20,000 and hit 100% on schedule!`;
    }

    if (p.includes('emi') || p.includes('loan') || p.includes('debt') || p.includes('prepay')) {
      return `**Debt & EMI Strategy for ${profile.familyName}**:
• Your Debt-to-Income (DTI) ratio is currently **11.2%**, well within the safe <30% threshold.
• **Prepayment Impact**: Making an additional prepayment of just ₹2,000/month towards your vehicle or personal loan can shave **14 months** off the tenure and save over **₹28,400 in interest**.
• **Recommendation**: Always prioritize loans with interest rates above 9.5% (like Personal or Education loans) before prepaying low-cost or zero-cost EMIs.`;
    }

    if (p.includes('food') || p.includes('dining') || p.includes('swiggy') || p.includes('zomato')) {
      return `**Food & Dining Budget Alert**:
• Allocated Budget: ₹6,500/month.
• Current Spend (Day 21): ₹5,800.
• AI Projection for End-of-Month: **₹8,400** (exceeding budget by ₹1,900).
• **Tactical Fix**: Limit weekend dine-outs to once every fortnight and use grocery bulk delivery to keep remaining 10 days under ₹1,200.`;
    }

    return `FinFam AI Analysis for **${profile.familyName}**:
• Total Family Vault: **${FinancialEngine.formatINR(profile.totalBalance)}**
• Monthly Cash Flow: **+${FinancialEngine.formatINR(profile.monthlySavings)}** net savings
• Financial Health: **${profile.healthScore}/100 (Tier: Excellent)**

Your core financial fundamentals are very healthy. The top recommendation right now is to keep discretionary shopping under ₹4,000 and direct the remaining surplus to your high-priority savings goals.`;
  },

  async askAdvisor(prompt: string, context: { userProfile: UserProfile; [key: string]: any }): Promise<string> {
    return this.askFinancialAdvisor(prompt, context.userProfile);
  },

  async generateDecisionInsights(
    winnerTitle: string,
    runnerUpTitle: string,
    capitalAmount: number,
    profile: UserProfile,
    tradeOffSummary: string
  ): Promise<string> {
    return `AI Executive Decision Memo for **${profile.familyName}**:
• Recommended Choice: **${winnerTitle}** for capital of ${FinancialEngine.formatINR(capitalAmount)}.
• Core Advantage: Balances family liquidity with compounding safety. While runner-up "${runnerUpTitle}" offers specific criterion gains, ${tradeOffSummary.toLowerCase()}
• Implementation Guidance: Automate this allocation before the 5th of next month to enforce budgeting discipline without manual intervention.`;
  }
};

