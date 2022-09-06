import React from 'react';

const MyPortfolio = () => {
    return (
        <section>
            <div className="flex flex-col lg:flex-row justify-evenly items-center">
                <div className='lg:order-2 w-2/4 lg:w-1/4'>
                    <img src='/MyPhoto.jpg' className='w-full rounded-full lg:rounded-2xl mx-auto' alt="" />
                </div>
                <div className='order-1'>
                    <h1 className="text-2xl lg:text-5xl font-bold uppercase text-center tracking-wider lg:tracking-tight">Md Nurul Islam</h1>
                    <p className="text-lg lg:text-2xl uppercase text-center tracking-tighter lg:tracking-widest">Web application developer
                    </p>
                </div>
            </div>

            <article className=''>
                <h2 className='text-2xl mt-5 uppercase text-center underline font-medium'>Education</h2>
                <div className="grid grid-cols-3 items-start text-center mb-3 shadow-sm">
                    <p className="text-xl">Secondary School Certificate</p> <p>:</p> <p className='text-left'>GPA- 3.83 (out of - 5)
                        <br />
                        Group:Science
                        <br />
                        Chaprashirhat High School.
                    </p>
                </div>
                <div className="grid grid-cols-3 items-start text-center mb-3 shadow-sm">
                    <p className="text-xl">Higher Secondary Certificate</p> <p>:</p> <p className='text-left'>GPA- 3.92 (out of - 5)
                        <br />
                        Group:Science
                        <br />
                        Chaprashirhat High Ismail Degree College.
                    </p>
                </div>
                <div className="grid grid-cols-3 items-start text-center">
                    <p className="text-xl">Honours</p> <p>:</p> <p className='text-left'>Departent of Political Science
                        <br />
                        National University
                        <br />
                        Studying......
                    </p>
                </div>
                <h2 className='text-2xl uppercase text-center underline mt-5 font-medium'>Projects I've Done!</h2>
                <ul className='list-decimal p-10 grid lg:grid-cols-2 mx-auto gap-10 items-center'>
                    <li className='shadow-lg'><a href="https://ak-timemachine.netlify.app/" target="_blank" rel='noreferrer' className='hover:text-primary hover:underline'>
                        <p className="text-xl font-bold">Time Machine (Count your freelance time and earned amount)</p>
                        <img src="/Projects-img/time-machine.png" alt="" />
                    </a>
                    </li>
                    <li className='shadow-lg'><a href="https://ncs-warehouse.netlify.app/home" target="_blank" rel='noreferrer' className='hover:text-primary hover:underline'>
                        <p className="text-xl font-bold">NCS-Warehouse(This is a warehouse management app for clothing store)</p>
                        <img src="/Projects-img/ncs-warehouse.png" alt="" />
                    </a>
                    </li>
                    <li className='shadow-lg'><a href="https://independent-service-prov-8e8ee.web.app/" target="_blank" rel='noreferrer' className='hover:text-primary hover:underline'>
                        <p className="text-xl font-bold">The man (This is a personal web application for a multitalented man)</p>
                        <img src="/Projects-img/the-man.png" alt="" />
                    </a>
                    </li>
                </ul>

                <div className='technologies mt-5'>
                    <h2 className='text-2xl uppercase text-center underline font-medium'>Technologies I'm using</h2>
                    <ul className='list-disc w-fit mx-auto'>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Javascript</li>
                        <li>React.js</li>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
                <div className="contact">
                    <h2 className='text-2xl uppercase text-center underline mt-5 font-medium'>Contact</h2>
                    <a className='flex items-center justify-center text-xl hover:text-primary hover:underline mt-3' href="tel:+88017154946">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" height='30' width='30' stroke="currentColor" className="mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        +8801715494846
                    </a>
                    <a className='flex items-center justify-center text-xl hover:text-primary hover:underline' href="mailto:nurulislamrimon@gmail.com">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" height='30' width='30' stroke="currentColor" className="mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        nurulislamrimon@gmail.com
                    </a>
                    <a className='flex items-center justify-center text-xl hover:text-primary hover:underline' target="_blank" rel='noreferrer' href="https://www.facebook.com/nirimon123/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook mr-3" viewBox="0 0 16 16"> <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" /> </svg>
                        www.facebook.com/nirimon123
                    </a>
                    <a className='flex items-center justify-center text-xl hover:text-primary hover:underline' target="_blank" rel='noreferrer' href="https://github.com/nurulislamrimon">
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="35" height="35" className='mr-3'>    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" /></svg>
                        www.github.com/nurulislamrimon
                    </a>
                </div>

            </article>
        </section>
    );
};

export default MyPortfolio;