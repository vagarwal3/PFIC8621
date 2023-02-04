import React from 'react';
import { Outlet, Link } from "react-router-dom";

export class Layout extends React.Component {
   public render(): JSX.Element {
  return (
    <>
        <div className="d-flex" id="wrapper">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>            
             <div className="border-end bg-white" id="sidebar-wrapper">
                 <div className="sidebar-heading border-bottom bg-light">PFIC8621</div>
                 <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/Section1291">Section 1291</Link>
                     <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Mark to Market Election</Link>
                     <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Qualified Electing Fund</Link>
                     <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/License">License</Link>
                     <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Discussion</Link>
                     <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/">Issues</Link>
                     <a href="https://github.com/vagarwal3/PFIC8621"><img width={50} alt="Source code on github" title="Source code on github" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img></a>
                 </div>
             </div>
            
             <div id="page-content-wrapper">
                
                 <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                     <div className="container-fluid">
                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                         <div className="collapse navbar-collapse" id="navbarSupportedContent">
                             <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                 <li className="nav-item active"><a className="nav-link" href="#!">Home</a></li>
                                 <li className="nav-item"><a className="nav-link" href="#!">Link</a></li>
                                 <li className="nav-item dropdown">
                                     <a className="nav-link dropdown-toggle" id="navbarDropdown" href="" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                     <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                         <a className="dropdown-item" href="#!">Action</a>
                                         <a className="dropdown-item" href="#!">Another action</a>
                                         <div className="dropdown-divider"></div>
                                         <a className="dropdown-item" href="#!">Something else here</a>
                                     </div>
                                 </li>
                             </ul>
                         </div>
                     </div>
                 </nav>
                
                 <div className="container-fluid">
                     <div className="App">
                     <Outlet />
                     </div>    
                     <p></p>
                 </div>
             </div>
         </div>

      
    </>
  )
   }}