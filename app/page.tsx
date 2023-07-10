import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
}

type Props = {
    searchParams: SearchParams
}

type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    },
}

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
    const data = await fetchAllProjects(category) as ProjectSearch

    const projectsToDisplay = data?.projectSearch?.edges || [];

    if (projectsToDisplay.length === 0) return (
        <section className="flexStart flex-col paddings mb-16">
            Categories
            <h1 className="no-result-text text-center">No Projects Found</h1>
        </section>
    )

    return (
        <section className="flexStart flex-col paddings mb-16">
            <Categories />
            <section className="projects-grid">
                {projectsToDisplay.map(({ node }) => (
                    <ProjectCard
                        key={node?.id}
                        id={node?.id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy.name}
                        avatarUrl={node?.createdBy.avatarUrl}
                        userId={node?.createdBy?.id}
                    />
                ))}
            </section>
            <h1>LoadMore</h1>
        </section>
    )
}

export default Home;