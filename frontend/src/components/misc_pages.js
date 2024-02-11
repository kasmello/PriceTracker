import React from "react";

function PageNotFound() {
    return (
        <div>
            <h1>ERROR 404: Page not found!</h1>
        </div>
    )
};

function About() {
    return (
        <div style={{ marginRight: '2em', marginLeft: '2em', marginTop: '3em'}}>
            <p>
                This website was constructed not only to learn more about front and backend development, but specifically how to 
                implement such skills in a realistic environment, such as a Website.
            </p>
        </div>
    )

}

export { PageNotFound, About }