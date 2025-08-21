
'use client';

import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


type Auction = {
    id: number;
    itemId: number;
    description: string;
    startTime: string;
    startingPrice: number;
    title: string;
    sellerId: number;
    itemName: string;
    sellerName: string;
    itemImage?: string
};


const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Toys",
    "Books",
];

export default function ProductPage() {
    const [auctions, setAuctions] = useState<Auction[]>([]);

    useEffect(() => {
        async function fetchAuction() {
            try {
                const response = await fetch('/api/auction', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched items:", data);
                    setAuctions(data);
                }
                else {
                    console.log("Failed to fetch items");
                }
            }
            catch {
                console.error("Failed to fetch item");
            }
        }
        fetchAuction();
    }, []);

    return (
        <div className="container py-4">
            {/* Landing Picture */}
            <div className="mb-4 rounded overflow-hidden" style={{ height: 220 }}>
                <img
                    src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
                    alt="Landing"
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectFit: "cover", borderRadius: "1rem" }}
                />
            </div>

            {/* Search Box */}
            <div className="row justify-content-center mb-3">
                <div className="col-md-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="form-control form-control-lg"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-10">
                    <div className="d-flex flex-wrap gap-3 justify-content-center">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                className="card shadow-sm border-primary"
                                style={{
                                    minWidth: 120,
                                    background: "#e3f2fd",
                                    borderRadius: 12,
                                    cursor: "pointer",
                                    transition: "transform 0.1s",
                                }}
                            >
                                <div className="card-body text-center p-3">
                                    <span className="fw-bold text-primary">{cat}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Cards */}
            <div className="row g-4">
                {Array.isArray(auctions) && auctions.map((auc) => (
                    <React.Fragment key={auc.id}>
                        <div className="col-md-4 col-sm-6">
                            <div className="card h-100 shadow-lg border-0" style={{ borderRadius: 16 }}>
                                {auc.itemImage && (
                                    <img
                                        src={auc.itemImage}
                                        alt={auc.itemName}
                                        className="card-img-top"
                                        style={{ height: 160, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{auc.title}</h5>
                                    <p className="card-text text-muted mb-2">{auc.description}</p>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <span className="fw-bold fs-5 text-success">${auc.startingPrice}</span>
                                        <button className="btn btn-primary btn-sm px-3 shadow">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}