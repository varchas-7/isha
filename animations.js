document.addEventListener("DOMContentLoaded", () => {


    const animatedElements = document.querySelectorAll(
        ".scene-content"
    );


    const observer = new IntersectionObserver(
        (entries)=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }


            });


        },
        {
            threshold:0.4
        }

    );


    animatedElements.forEach(element=>{

        observer.observe(element);

    });


});