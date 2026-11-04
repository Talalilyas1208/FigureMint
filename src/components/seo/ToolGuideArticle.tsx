import React from "react";
import { ToolGuideContent } from "@/data/guides/types";
import { AppCard } from "@/components/ui/AppCard";
import { AppBadge } from "@/components/ui/AppBadge";

interface ToolGuideArticleProps {
  guide: ToolGuideContent;
  formulaNote: string;
}

export function ToolGuideArticle({ guide, formulaNote }: ToolGuideArticleProps) {
  return (
    <article className="prose-shell" style={{ maxWidth: "100%" }}>
      <div style={{ marginBottom: 12 }}>
        <AppBadge tone="stone">{guide.updatedLabel}</AppBadge>
      </div>

      <p style={{ fontSize: "1.04rem" }}>{guide.intro}</p>

      <AppCard style={{ backgroundColor: "var(--bg-section)", marginBlock: 20 }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 4 }}>
          FORMULA SUMMARY
        </div>
        <code style={{ fontSize: "0.94rem", fontWeight: 700, color: "var(--text-heading)", wordBreak: "break-word" }}>
          {formulaNote}
        </code>
      </AppCard>

      {guide.sections.map((sec) => (
        <section key={sec.heading}>
          <h2>{sec.heading}</h2>
          {sec.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>
      ))}

      <h2>{guide.tableCaption}</h2>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {guide.tableHeaders.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guide.tableRows.map((row) => (
              <tr key={row[0]}>
                <td><strong>{row[0]}</strong></td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppCard style={{ backgroundColor: "var(--bg-primary-soft)", borderColor: "var(--border-primary-soft)" }}>
        <h3 style={{ marginTop: 0 }}>{guide.workedExample.title}</h3>
        <ol style={{ paddingLeft: 20, marginBottom: 12 }}>
          {guide.workedExample.steps.map((step, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {step}
            </li>
          ))}
        </ol>
        <p style={{ marginBottom: 0, fontWeight: 600, color: "var(--text-primary-deep)" }}>
          Takeaway: {guide.workedExample.takeaway}
        </p>
      </AppCard>
    </article>
  );
}
