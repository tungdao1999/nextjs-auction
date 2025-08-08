import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
};

const mockProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        description: "High quality wireless headphones with noise cancellation.",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 149.99,
        description: "Feature-rich smart watch with health tracking.",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 59.99,
        description: "Portable Bluetooth speaker with deep bass.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 4,
        name: "Gaming Mouse",
        price: 39.99,
        description: "Ergonomic gaming mouse with customizable buttons.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 5,
        name: "Fitness Tracker",
        price: 79.99,
        description: "Track your daily activity and sleep patterns.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
];

const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Toys",
    "Books",
];

export default function ProductPage() {
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
                {mockProducts.map((product) => (
                    <div key={product.id} className="col-md-4 col-sm-6">
                        <div className="card h-100 shadow-lg border-0" style={{ borderRadius: 16 }}>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ height: 160, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{product.name}</h5>
                                <p className="card-text text-muted mb-2">{product.description}</p>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-5 text-success">${product.price.toFixed(2)}</span>
                                    <button className="btn btn-primary btn-sm px-3 shadow">Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}