import './ProjectCard.css'

export default function ProjectCard({project}) {
    return (
        <>
            <div className="project-card">
                <div className="project-card_main">
                    <label>{project.name}</label>
                    <div className="project-card_footer">
                        <span>15 users in project</span>
                        <a href="/">Details {project.id}</a>
                    </div>
                </div>
            </div>
        </>
    )
}