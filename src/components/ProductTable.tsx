import {useEffect, useState} from "react";
import {fetchProduct } from "../api/ProductService.ts";
import type {Product} from "../types/Product";
import axios from "axios";

const ProductTable = () => {
    const [product, setProduct] = useState<Product[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState(0.00);

    useEffect(() => {
        fetchProduct().then(setProduct).catch(console.error);
    }, []);

    const handleCreate = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/product", {
                name: newProductName,
                price: newProductPrice,
            });
            setProduct([...product, response.data]);
            setShowDialog(false);
            setNewProductName("");
            setNewProductPrice(0.00);
        } catch (error) {
            console.error("Failed to create product", error);
        }
    };

    return (
        <>
        <h1>Products</h1>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
            </tr>
            </thead>
            <tbody>
            {product.map((product: Product) => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
            <div>
                <button onClick={() => setShowDialog(true)}> Add Product</button>
            </div>
            {/* Simple dialog box */}
            {showDialog && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    background: "rgba(0, 0, 0, 0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "6px" }}>
                        <h2>New Product</h2>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={newProductPrice}
                            onChange={(e) => {setNewProductPrice(Number(e.target.value))}}
                            />
                        <br /><br />
                        <button onClick={handleCreate}>Create</button>
                        <button onClick={() => setShowDialog(false)} style={{ marginLeft: "1rem" }}>Cancel</button>
                    </div>
                </div>
                )}
        </>
    )
}

export default ProductTable;