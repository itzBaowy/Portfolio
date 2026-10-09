import { ArrowDown, ArrowRight, Database, HardDrive, Mail, Monitor, Server } from "lucide-react";
import { dineflowArchitecture as system } from "@/data/dineflow";

const icons = { database: Database, storage: HardDrive, mail: Mail };

export function DineFlowArchitecture() {
  return (
    <figure className="system-architecture" aria-label="DineFlow system architecture">
      <div className="system-main">
        <article className="system-node system-client">
          <Monitor size={24} strokeWidth={1.5} aria-hidden="true" />
          <span className="eyebrow">CLIENT LAYER</span>
          <h3>{system.client.title}</h3>
          <p>{system.client.detail}</p>
          <ul className="tags">
            {system.client.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </article>
        <div className="system-transport">
          <span className="mono">HTTPS</span>
          <ArrowRight className="system-arrow-horizontal" size={30} aria-hidden="true" />
          <ArrowDown className="system-arrow-vertical" size={26} aria-hidden="true" />
          <span>REST + Socket.IO</span>
        </div>
        <article className="system-node system-api">
          <Server size={24} strokeWidth={1.5} aria-hidden="true" />
          <span className="eyebrow">APPLICATION LAYER</span>
          <h3>{system.api.title}</h3>
          <p>{system.api.detail}</p>
          <ul className="tags">
            {system.api.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </article>
      </div>
      <div className="system-dependencies mono">
        <ArrowDown size={20} aria-hidden="true" />
        NESTJS DATA & INTEGRATIONS
      </div>
      <div className="system-services">
        {system.services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <article className="system-node" key={service.title}>
              <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              <h3>{service.title}</h3>
              <span className="system-service-label mono">{service.label}</span>
              <p>{service.detail}</p>
            </article>
          );
        })}
      </div>
      <figcaption>{system.caption}</figcaption>
    </figure>
  );
}
