const translateTopic = (rawTopic) => {
    let lowercase = rawTopic.toLowerCase().replace(" ", "_");

    switch (lowercase) {
        case 'excel_vba':
            return "Excel";
        case 'sql':
            return 'SQL';
        case 'javascript':
            return 'JavaScript';
        case 'html_css':
            return 'HTML/CSS';
        case 'python_pandas_matplotlib':
            return 'Python';
        case 'computer_science':
            return 'Computer Science';
        case 'node_express':
            return 'Node.js';
        case 'git':
            return 'Git';
        case 'apis':
            return 'APIs';
        case 'orms':
            return 'ORMs';
        case 'statistics':
            return 'Statistics';
        case 'etl':
            return 'ETL'
        case 'react':
            return 'React (JS)'
        case 'consulting':
            return 'Final Project'
        case 'aws_docker_deploy':
            return 'Cloud / Containers';
        case 'flask':
            return 'Flask (Python)';
        case 'd3_plotly_js':
            return 'Web Dashboards';
        case 'tableau':
            return 'Tableau';
        case 'geojson':
            return 'Geospatial Data';
        case 'pyspark':
            return 'PySpark (Big Data)';
        case 'ml_supervised':
            return 'Supervised ML';
        case 'ml_unsupervised':
            return 'Unsupervised ML';
        case 'graphql':
            return 'GraphQL'
        case 'ml_deep_learning':
            return 'Deep Learning';
        default:
            return rawTopic;
    }
}

export default translateTopic;