import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { MOCK_SKILLS } from "#/mock/mock";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div id="home">
			<section className="hero">
				<div className="copy">
					<h1>
						The Registry for <br />
						<span className="text-gradient">Agentic Intelligence</span>
					</h1>
					<p>
						Streamline agent development: discover, publish, and operate
						reusable capabilities through a single route-driven workspace.
					</p>
				</div>

				<div className="actions">
					<Link to="/skills" className="btn-primary">
						<Terminal size={18} />
						<span>Browse Registry</span>
					</Link>
					<Link to="/skills/new" className="btn-secondary">
						Publish Skill
					</Link>
				</div>
			</section>

			<section className="latest">
				<div className="space-y-2">
					<h2>
						Recently Created <span className="text-gradient">Skills</span>
					</h2>
					<p>
						{" "}
						Latest skills loaded from database in descending creation order.
					</p>
				</div>

				<div className="skills-grid">
					{MOCK_SKILLS.length > 0 ? (
						MOCK_SKILLS.map((_skill) => (
							<SkillCard key={_skill.id} {..._skill} />
						))
					) : (
						<p>No skills found</p>
					)}
				</div>
			</section>
		</div>
	);
}
