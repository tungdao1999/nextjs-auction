'use client';
import { useEffect } from "react";

export default function Bid({ auctionId }: { auctionId: string }) {
    useEffect(() => {

    }, [auctionId]);

    const handleBid = () => {

    };

    return (
        <div>
            <div className="row mb-4">
                <div className="col-12">
                    {/* Media: Replace src with actual image or video url */}
                    <img src="/placeholder-media.jpg" alt="Auction Media" className="img-fluid rounded" />
                    {/* Or use <video> if needed */}
                    {/* <video src="/placeholder-media.mp4" controls className="w-100 rounded" /> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    {/* History Table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Bidder</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example rows, replace with dynamic data */}
                            <tr>
                                <td>User1</td>
                                <td>$100</td>
                                <td>2024-06-01 12:00</td>
                            </tr>
                            <tr>
                                <td>User2</td>
                                <td>$120</td>
                                <td>2024-06-01 12:05</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-between">
                    <div className="mb-3">
                        <strong>Ranking:</strong> #2
                    </div>
                    <div className="mb-3">
                        <strong>Bidding Number:</strong> 5
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm px-3 shadow w-100" onClick={handleBid}>
                            Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
