'use client';
import { createClientAxios } from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import { Auction } from "../types/auction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Bid({ auctionId }: { auctionId: string }) {
    const [bidAmount, setBidAmount] = useState(0);
    const [auctionDetails, setAuctionDetails] = useState<Auction | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const axiosInstance = await createClientAxios();
            const response = await axiosInstance.get(`/api/auction/${auctionId}`);
            if (response.status === 200) {
                setAuctionDetails(response.data);
            }
        };
        fetchData();
    }, [auctionId]);

    const handleBid = () => {
        console.log("Bid placed with amount:", bidAmount);
    };

    return (
        <div>
            <div className="row mb-4">
                <div className="col-12">
                    {auctionDetails && auctionDetails.mediaLink && (
                        <>
                            {auctionDetails.mediaType === "video" ? (
                                <video controls className="img-fluid rounded">
                                    <source src={auctionDetails.mediaLink} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={auctionDetails.mediaLink} alt="Auction Media" className="img-fluid rounded" />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <Table className="table table-bordered">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bidder</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auctionDetails?.biddings && auctionDetails.biddings.length > 0 && (
                                <>
                                    {auctionDetails.biddings.map((bidding) => (
                                        <TableRow key={bidding.id}>
                                            <TableCell>{bidding.buyerName}</TableCell>
                                            <TableCell>${bidding.price}</TableCell>
                                            <TableCell>{bidding.createdAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-between">
                    <div className="mb-3">
                        <strong>Ranking:</strong> #2
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bidAmount" className="form-label">
                            <strong>Bidding Number:</strong>
                        </label>
                        <input
                            type="number"
                            id="bidAmount"
                            className="form-control"
                            value={bidAmount}
                            min={1}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                        />
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
