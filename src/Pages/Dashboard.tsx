import "bootstrap/dist/css/bootstrap.min.css"

const Dashboard: React.FC = () => {
    return(
        <div className="container-fluid w-100">
            <div className="row bg-light m-2 rounded shadow">
                <div className="col-md-6">
                    <img 
                        src="./Images/apple.jpg" 
                        alt="apple"
                        width="80%"
                        className="m-3 rounded"
                    />
                </div>
                <div className="col-md-6 align-self-center">
                    <div className="border rounded m-3 p-2">
                        <div className="h6 text-warning">
                        An apple is an edible fruit produced by an apple tree. 
                        Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. 
                        The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. 
                    </div>
                    </div>
                </div>
            </div>
            <div className="row bg-light m-2 rounded shadow">
            <div className="col-md-6 align-self-center">
                    <div className="border rounded m-3 p-2">
                        <div  className="h6 text-warning">
                        An apple is an edible fruit produced by an apple tree. 
                        Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. 
                        The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. 
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img 
                        src="./Images/apple.jpg" 
                        alt="apple"
                        width="80%"
                        className="m-3 rounded"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard