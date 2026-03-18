export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `You are a STRICT JSON generator for an exam preparation system.
  
    VERY IMPORTANT : 
    - Output must be valid json
    -your response will be parsed will be parsed using JSON.parse()
    -INVALID JSON will be cause system failure
    -Use only double quotes "
    -No Comments , NO trailing commas
    -Escape line breaks using \\n+  -Do NOT use emoji inisde text values
  
    TASK :
    Convert the given topic into exam-focused notes.

    INPUT:
    Topic:${topic}
    Class Level:${classLevel || "Not Specified"}
    Exam Type: ${examType || "General"}
    Revision Mode :${revisionMode ? "ON" : "OFF"}
    Includes Diagram : ${includeDiagram ? "YES" : "NO"}
    Includes Charts: ${includeChart ? "YES" : "NO"}

    GLOBAL CONTENT RULES:
    - Use clear , simple , exam-oriented language
    - Notes Must be markdown formatted 
    - Headings and bullet points only

    REVISION MODE RULES (CRITICAAL):
    - IF REVISION MODE is ON :
        - Notes must be vary short
        - only bullet points
        - One-liner answer only
        - Definations, formulas , keywords
        - No  paragraphs
        - No explanations
        - Content must be feel like :
            -last-day revison 
            - 5-minute exam cheat sheet
        - revisonPoints MUST summarise ALL important points and facts

    - IF REVISON MODE IS OFF:
        - Notes must be detailed but exam focused
        -each topic should incluse :
            -definations
            -short explanations
            -examples (if applicable)
        -Paragraph length : max 2-4 lines 
        - No storytellling , no extra theory

    IMPORTANCE RULES:
    - Divide sub-topics into THREE categories:
            ⭐ Very Important Topics
            ⭐⭐ Important Topics
            ⭐⭐⭐ Frequently Asked Topics
    - All three categories MUST be present
    - Base importance on exam frequency and weightage

DIAGRAM RULES:
    - If INCLUDE DIAGRAM is YES:
            - diagram.data MUST be a SINGLE STRING
            - Valid Mermaid syntax only
            - Must start with: graph TD
            - Wrap EVERY node label in square brackets [ ]
            - Do NOT use special characters inside labels
    - If INCLUDE DIAGRAM is NO:
            - diagram.data MUST be ""

CHART RULES (RECHARTS):
    - If INCLUDE CHARTS is YES:
            - charts array MUST NOT be empty
            - Generate at least ONE chart
            - Choose chart based on topic type:
                    - THEORY topic → bar or pie (importance / weightage)
                    - PROCESS topic → bar or line (steps / stages)
            - Use numeric values ONLY
            - Labels must be short and exam-oriented
    - If INCLUDE CHARTS is NO:
            - charts MUST be []

CHART TYPES ALLOWED:
    - bar
    - line
    - pie

CHART OBJECT FORMAT:
{
        "type": "bar | line | pie",
        "title": "string",
        "data": [
                { "name": "string", "value": 10 }
        ]
}

STRICT JSON FORMAT (DO NOT CHANGE):

{
        "subTopics": {
                "⭐": [],
                "⭐⭐": [],
                "⭐⭐⭐": []
        },
                "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
        "notes": "string",
        "revisionPoints": [],
        "questions": {
                "short": [],
                "long": [],
                "diagram": ""
        },
        "diagram": {
                "type": "flowchart | graph | process",
                "data": ""
        },
        "charts": []
}

    RETURN ONLY VALID JSON.
    `;
};
