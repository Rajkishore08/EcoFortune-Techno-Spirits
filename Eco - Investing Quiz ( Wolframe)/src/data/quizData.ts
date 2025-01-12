export const quizData = {
  title: "EcoFortune Eco-Conscious Financial Quiz",
  description: "Answer these questions to help us understand your eco-conscious financial preferences, risk appetite, and goals. Based on your answers, we'll provide personalized investment suggestions and environmental impact tracking.",
  questions: [
    {
      id: 1,
      question: "What is your primary goal for eco-conscious investing?",
      type: "multiple_choice",
      options: [
        "Contribute to environmental sustainability while earning returns",
        "Support companies and projects that reduce carbon emissions",
        "Invest in renewable energy and green technologies",
        "Align my financial growth with positive environmental impact"
      ]
    },
    {
      id: 2,
      question: "How much of your portfolio would you like to dedicate to eco-conscious investments?",
      type: "multiple_choice",
      options: [
        "Less than 20%",
        "20-50%",
        "50-80%",
        "80-100%"
      ]
    },
    {
      id: 3,
      question: "Which environmental cause resonates most with your values?",
      type: "multiple_choice",
      options: [
        "Renewable energy and reducing fossil fuel dependency",
        "Fighting climate change through carbon offsetting",
        "Protecting biodiversity and ecosystems",
        "Sustainable urban development and infrastructure"
      ]
    },
    {
      id: 4,
      question: "How important is financial return compared to environmental impact?",
      type: "multiple_choice",
      options: [
        "Financial return is my top priority",
        "I want a balance between returns and environmental impact",
        "Environmental impact is more important, even with lower returns",
        "I prioritize environmental impact over financial returns entirely"
      ]
    },
    {
      id: 5,
      question: "How long are you willing to stay invested in green assets?",
      type: "multiple_choice",
      options: [
        "Less than 1 year",
        "1-5 years",
        "5-10 years",
        "More than 10 years"
      ]
    },
    {
      id: 6,
      question: "What types of eco-conscious investments interest you most?",
      type: "multiple_choice",
      options: [
        "Renewable energy projects (solar, wind, hydro)",
        "Carbon credits or offset programs",
        "Sustainable agriculture or biodiversity initiatives",
        "Green real estate and infrastructure"
      ]
    },
    {
      id: 7,
      question: "Would you like to track the environmental impact of your investments?",
      type: "multiple_choice",
      options: [
        "Yes, I want detailed insights into the impact",
        "Yes, but I prefer high-level summaries",
        "No, financial returns are more important to me"
      ]
    },
    {
      id: 8,
      question: "How do you respond to economic or environmental challenges in your investments?",
      type: "multiple_choice",
      options: [
        "I reduce investments in green initiatives during challenges",
        "I maintain my investments but avoid new commitments",
        "I hold firm and stay committed to my goals",
        "I see challenges as opportunities to invest more in sustainability"
      ]
    },
    {
      id: 9,
      question: "Are you interested in community-driven eco-investments?",
      type: "multiple_choice",
      options: [
        "Yes, I'd like to fund grassroots environmental projects",
        "Yes, but only if they align with strong financial returns",
        "No, I prefer institutional green investments"
      ]
    },
    {
      id: 10,
      question: "How frequently would you like to receive updates on the environmental impact of your investments?",
      type: "multiple_choice",
      options: [
        "Monthly updates",
        "Quarterly updates",
        "Yearly updates",
        "Only on significant milestones"
      ]
    }
  ],
  suggestions: {
    "Contribute to environmental sustainability while earning returns": "Recommend a mix of green mutual funds and eco-focused ETFs.",
    "Support companies and projects that reduce carbon emissions": "Suggest investments in carbon credit markets and low-emission companies.",
    "Invest in renewable energy and green technologies": "Highlight renewable energy stocks or green infrastructure funds.",
    "Align my financial growth with positive environmental impact": "Recommend ESG-compliant portfolios that balance profit and purpose.",
    "Less than 20%": "Recommend adding low-risk green bonds or a few ESG-focused funds.",
    "20-50%": "Suggest diversifying into renewable energy ETFs and sustainable agriculture stocks.",
    "50-80%": "Propose a balanced portfolio with green tech, eco-friendly real estate, and impact funds.",
    "80-100%": "Suggest fully dedicated options, like green mutual funds or carbon offset initiatives.",
    "Renewable energy and reducing fossil fuel dependency": "Recommend investing in solar and wind energy projects or green energy ETFs.",
    "Fighting climate change through carbon offsetting": "Highlight carbon credit markets and sustainable forestry initiatives.",
    "Protecting biodiversity and ecosystems": "Suggest biodiversity-focused funds or eco-conscious companies.",
    "Sustainable urban development and infrastructure": "Recommend green REITs or sustainable urban development bonds.",
    "Financial return is my top priority": "Recommend ESG investments with strong performance metrics.",
    "I want a balance between returns and environmental impact": "Suggest blended portfolios of growth-oriented eco funds.",
    "Environmental impact is more important, even with lower returns": "Propose green bonds and impact investing opportunities.",
    "I prioritize environmental impact over financial returns entirely": "Highlight non-profit green ventures and social impact projects.",
    "Less than 1 year": "Recommend short-term green bonds or liquid ESG funds.",
    "1-5 years": "Suggest balanced ESG portfolios with mid-term goals in renewable energy.",
    "5-10 years": "Propose growth-focused green mutual funds or green REITs.",
    "More than 10 years": "Highlight long-term renewable energy projects and impact funds.",
    "Renewable energy projects (solar, wind, hydro)": "Recommend solar energy ETFs, wind energy stocks, or hydro projects.",
    "Carbon credits or offset programs": "Suggest carbon trading platforms or certified offset funds.",
    "Sustainable agriculture or biodiversity initiatives": "Highlight sustainable farming initiatives or agriculture tech funds.",
    "Green real estate and infrastructure": "Propose green REITs or bonds funding eco-smart cities.",
    "Yes, I want detailed insights into the impact": "Offer detailed analytics on carbon offset, emission reduction, and biodiversity impact.",
    "Yes, but I prefer high-level summaries": "Provide simple metrics like green scores or impact summaries.",
    "No, financial returns are more important to me": "Focus on high-performing eco-conscious funds without extensive tracking.",
    "I reduce investments in green initiatives during challenges": "Recommend low-risk green bonds or ESG ETFs.",
    "I maintain my investments but avoid new commitments": "Suggest stable funds with diversified green investments.",
    "I hold firm and stay committed to my goals": "Highlight long-term green mutual funds.",
    "I see challenges as opportunities to invest more in sustainability": "Propose aggressive investment strategies like emerging green tech stocks.",
    "Yes, I'd like to fund grassroots environmental projects": "Recommend green crowdfunding platforms or community solar projects.",
    "Yes, but only if they align with strong financial returns": "Suggest grassroots initiatives with profit-sharing models.",
    "No, I prefer institutional green investments": "Highlight institutional ESG funds or government-backed green bonds.",
    "Monthly updates": "Offer frequent carbon footprint reduction metrics or impact reports.",
    "Quarterly updates": "Provide detailed quarterly sustainability breakdowns.",
    "Yearly updates": "Summarize annual environmental impact.",
    "Only on significant milestones": "Share milestone-driven updates, such as funding the completion of green projects."
  }
} as const;