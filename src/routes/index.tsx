import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Terminal } from "lucide-react";
import SkillCard from "#/components/SkillCard";
import { getSkills } from "#/dataconnect-generated";
import { dataConnect } from "#/lib/firebase";

const getSkillsHandler = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const { data } = await getSkills(dataConnect, {
			searchTerm: "",
			limit: 10,
		});
		return data.skills;
	} catch (error) {
		console.error(error);
		return [];
	}
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: () => getSkillsHandler(),
});

function Home() {
	const skills = Route.useLoaderData();

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
					{skills.length > 0 ? (
						skills.map((_skill) => <SkillCard key={_skill.id} {..._skill} />)
					) : (
						<p>No skills found</p>
					)}
				</div>
			</section>
		</div>
	);
}
