import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Homecompent/Footer"; // Ensure the correct path
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("should display contact information", () => {
    render(<Footer />);
    // Check if the store location, phone number, and email are displayed
    const storeLocation = screen.getByText(/Store Location:/i);
    expect(storeLocation).toBeInTheDocument();

    const phoneNumber = screen.getByText(/98262330/i);
    expect(phoneNumber).toBeInTheDocument();

    const email = screen.getByText(/BariqJewelry/i);
    expect(email).toBeInTheDocument();
  });

  test("should display social media links", () => {
    render(<Footer />);
    // Check if Instagram and Snapchat links are displayed
    const instagramLink = screen.getByText(/Instagram/i);
    expect(instagramLink).toBeInTheDocument();

    const snapchatLink = screen.getByText(/Snapchat/i);
    expect(snapchatLink).toBeInTheDocument();
  });

  test("should contain a copyright section", () => {
    render(<Footer />);
    // Check if the copyright section is present
    const copyright = screen.getByText(/© 2025  Bariq Jewelry/i);
    expect(copyright).toBeInTheDocument();
  });

  test("should have correct link functionality", () => {
    render(<Footer />);
    // Check if the Instagram link has the correct URL
    const instagramLink = screen.getByText(/Instagram/i);
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/bariq_jewelry1"
    );

    // Check if the Snapchat link has the correct URL
    const snapchatLink = screen.getByText(/Snapchat/i);
    expect(snapchatLink).toHaveAttribute(
      "href",
      "https://www.snapchat.com/add/tfg7e"
    );
  });
});
