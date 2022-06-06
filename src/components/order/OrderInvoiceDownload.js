import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";

const OrderInvoiceDownload = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                </Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>React Redux Ecommerce</Text>
                <Text style={styles.subtitle}>Order Summary</Text>
                <Table style={styles.table} data={order.products}>
                    <TableHeader>
                        <TableCell style={styles.tableCell}>Title</TableCell>
                        <TableCell style={styles.tableCell}>Price</TableCell>
                        <TableCell style={styles.tableCell}>Quantity</TableCell>
                        <TableCell style={styles.tableCell}>Brand</TableCell>
                        <TableCell style={styles.tableCell}>Color</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell
                            style={styles.tableBodyCell}
                            getContent={(r) => r.product.title}
                        />
                        <DataTableCell
                            getContent={(r) => `$${r.product.price}`}
                            style={styles.tableBodyCell}
                        />
                        <DataTableCell
                            getContent={(r) => r.count}
                            style={styles.tableBodyCell}
                        />
                        <DataTableCell
                            getContent={(r) => r.product.brand}
                            style={styles.tableBodyCell}
                        />
                        <DataTableCell
                            getContent={(r) => r.product.color}
                            style={styles.tableBodyCell}
                        />
                    </TableBody>
                </Table>

                <Text style={styles.text}>
                    <Text>
                        Date:{"               "}
                        {new Date(
                            order.paymentIntents.created * 1000
                        ).toLocaleString()}
                    </Text>
                    {"\n"}
                    <Text>
                        Order Id: {"        "}{order.paymentIntents.id}
                    </Text>
                    {"\n"}
                    <Text>
                        Order Status:{"  "}
                        {order.orderStatus}
                    </Text>
                    {"\n"}
                    <Text>
                        Total Paid:{"       "}
                        {(order.paymentIntents.amount / 100).toLocaleString(
                            "en-US",
                            {
                                style: "currency",
                                currency: "USD",
                            }
                        )}
                    </Text>
                </Text>
                <Text style={styles.footer}>
                    ~ Thank you so much for shopping with us ~
                </Text>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        textAlign:"center"
    },
    table: {
        textAlign: "center",
        verticalAlign: "middle",
    },
    tableCell: {
        textAlign: "center",
    },
    tableBodyCell: {
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export default OrderInvoiceDownload;
