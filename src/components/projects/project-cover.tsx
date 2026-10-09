import Image from "next/image";
import {
  ArrowUpRight,
  Circle,
  Columns3,
  LayoutDashboard,
  ListTodo,
  QrCode,
  UtensilsCrossed,
} from "lucide-react";
import type { Project } from "@/types/content";
import { copy } from "@/data/site-copy";

// Prefer real screenshots; fallback illustrations remain explicitly labeled concepts.
export function ProjectCover({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  if (project.cover)
    return (
      <div className="project-cover project-cover-real">
        <Image
          src={project.cover}
          alt={project.coverAlt ?? `${project.name} project cover`}
          fill
          sizes={compact ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 850px) 100vw, 70vw"}
          className="cover-image"
        />
      </div>
    );
  return (
    <div className={`project-cover cover-${project.slug}`}>
      <span className="concept-label mono">
        {project.status === "reserved" ? copy.work.previewPending : copy.work.preview} /{" "}
        {project.number}
      </span>
      <div className="concept-art" aria-hidden="true">
        {project.slug === "dineflow" ? (
          <>
            <div className="dine-orbit" />
            <div className="product-window dine-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <p>DineFlow / Restaurant workspace</p>
              </div>
              <div className="product-body">
                <aside className="product-sidebar">
                  <UtensilsCrossed size={19} />
                  <span className="selected">
                    <LayoutDashboard size={12} />
                    Overview
                  </span>
                  <span>
                    <ListTodo size={12} />
                    Orders
                  </span>
                  <span>
                    <QrCode size={12} />
                    Tables
                  </span>
                  <div className="sidebar-mark">DF.</div>
                </aside>
                <div className="dine-content">
                  <p className="mock-eyebrow">SERVICE, IN SYNC.</p>
                  <h4>A better flow.</h4>
                  <div className="dine-tiles">
                    {["Table service", "Kitchen", "Ordering"].map((label, i) => (
                      <div key={label}>
                        <span className={`mock-dot mock-dot-${i}`} />
                        <span>{label}</span>
                        <ArrowUpRight size={10} />
                      </div>
                    ))}
                  </div>
                  <div className="mock-chart">
                    <span>Connected operations</span>
                    <div className="chart-bars">
                      {[40, 62, 45, 78, 55, 90, 73, 96, 68, 83, 100, 80].map((height, index) => (
                        <i key={index} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="qr-phone">
              <span className="phone-speaker" />
              <UtensilsCrossed size={17} />
              <p>At your table.</p>
              <span className="phone-subtitle">SCAN. ORDER. ENJOY.</span>
              <div className="qr-mark">
                <QrCode size={58} strokeWidth={1.4} />
              </div>
              <span className="phone-action">
                Explore the menu <ArrowUpRight size={10} />
              </span>
            </div>
          </>
        ) : project.slug === "flowsync" ? (
          <>
            <div className="flow-grid" />
            <div className="product-window flow-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
                <p>FlowSync / Shared workspace</p>
              </div>
              <div className="product-body">
                <aside className="product-sidebar">
                  <Columns3 size={20} />
                  <span className="selected">
                    <LayoutDashboard size={12} />
                    Workspace
                  </span>
                  <span>
                    <ListTodo size={12} />
                    My tasks
                  </span>
                  <span>
                    <Circle size={12} />
                    Activity
                  </span>
                  <div className="sidebar-mark">FS.</div>
                </aside>
                <div className="flow-content">
                  <p className="mock-eyebrow">LESS FRICTION. MORE FLOW.</p>
                  <h4>Good work, together.</h4>
                  <div className="mock-kanban">
                    {[
                      {
                        name: "Ideas",
                        tasks: ["Explore the possibilities", "Map the user journey"],
                      },
                      {
                        name: "In focus",
                        tasks: ["Design with intention", "Connect the experience"],
                      },
                      { name: "Up next", tasks: ["Build the foundations"] },
                    ].map((column, index) => (
                      <div key={column.name}>
                        <span className="kanban-title">
                          <i className={`mock-dot mock-dot-${index}`} />
                          {column.name}
                        </span>
                        {column.tasks.map((task, taskIndex) => (
                          <div className="mock-task" key={task}>
                            <span className={`task-tag tag-${index}`}>
                              {["Planning", "Design", "Engineering"][index]}
                            </span>
                            <p>{task}</p>
                            <div className="task-detail">
                              <span className="task-line" />
                              <span className="task-avatar">{taskIndex ? "B" : "A"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-floating">
              <span className="accent-dot" />
              In the same workspace.
              <ArrowUpRight size={13} />
            </div>
          </>
        ) : (
          <div className="reserved-art">
            <span className="mono">{project.number}</span>
            <div className="blueprint-cross" />
          </div>
        )}
      </div>
    </div>
  );
}
