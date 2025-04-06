import mongoose from "mongoose";
import dotenv from "dotenv";
import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB for seeding.");

    // Clear existing collections
    await Customer.deleteMany({});
    await Employee.deleteMany({});

    // Insert example data for Customer dashboard
    await Customer.create({
      complaintCount: 1,
      serviceSLA: 30,
      resolutionSLA: 60,
      customerSatisfactionScore: 9,
      serviceQuality: 8,
      lastSupervision: new Date(),
      certifiedProfessionals: true,
      checklistCompleted: true,
      teamChangeRequest: false,
      name: "John Doe",
      occupation: "Manager",
      companyName: "Cleaning Corp",
      profilePicture: "http://example.com/profile.jpg",
      industry: "Cleaning",
      history: [
        {
          date: new Date("2020-01-01"),
          description:
            "January 2020: Initial contact with John Doe, a manager at Cleaning Corp. The client inquired about the cleaning services for their company, specifically for daily office cleaning. After a detailed discussion, the first contract was signed for weekly cleaning services with a SLA of 48 hours for complaints.",
        },
        {
          date: new Date("2020-03-01"),
          description:
            "March 2020: The client raised concerns about the timing of service delivery, as certain areas of the office were being cleaned outside business hours, causing some disruption. The issue was escalated, and the cleaning schedule was modified to accommodate the client’s preference for evening services. The SLA was also reduced to 36 hours for better response times.",
        },
        {
          date: new Date("2021-08-01"),
          description:
            "August 2021: John Doe requested a review of the service quality, mentioning that certain areas were not being cleaned to the expected standards. A formal complaint was filed, and the company immediately initiated a thorough review of the cleaning processes. A site supervisor was assigned to oversee operations, and additional staff was trained to meet the company's higher quality standards. This resulted in a significant improvement in the client's satisfaction, and the complaint was resolved within a week.",
        },
        {
          date: new Date("2022-01-01"),
          description:
            "January 2022: After ongoing positive feedback and a steady improvement in service quality, John Doe requested an upgrade to a premium cleaning package, which included the cleaning of sensitive areas (e.g., boardrooms, executive offices) twice a week. The response SLA was also adjusted to 24 hours for urgent requests. This decision was based on Cleaning Corp's expansion and the need for more personalized services.",
        },
        {
          date: new Date("2023-09-01"),
          description:
            "September 2023: Following several positive evaluations, John Doe presented a renewal contract. The cleaning service contract was extended for two more years, with enhanced service quality and the addition of seasonal deep cleans. Additionally, a new 24-hour response SLA for high-priority complaints was implemented, ensuring immediate attention to any client concerns.",
        },
        {
          date: new Date("2024-03-01"),
          description:
            "March 2024: John Doe expressed interest in an environmentally friendly cleaning service. A pilot program was initiated, using eco-friendly products for cleaning, and this was well-received by the client. The client’s satisfaction score for the green cleaning program was rated 10/10. A formal request for expanding the use of these products across all offices was made, leading to the successful implementation of the program company-wide.",
        },
      ],
    });

    // Insert example data for Employee dashboard
    await Employee.create({
      energyLevel: 7,
      committedEmployee: true,
      complianceValuesAndConduct: true,
      customerSatisfactionScore: 8,
      complaints: 0,
      serviceQuality: 9,
      accountCompliance: true,
      employeeLevel: "Gold",
      growthGoals: ["Training", "Feedback"],
      name: "Jane Smith",
      profilePicture: "http://example.com/profile.jpg",
      position: "Supervisor",
      teamName: "Team A",
      entryDate: new Date("2021-01-15"),
      history: [
        {
          date: new Date("2021-01-01"),
          description:
            "January 2021: Jane Smith joined the company as a Supervisor, bringing over 5 years of experience in customer service. Her first month was spent shadowing senior supervisors, learning the company's standards, and managing minor customer complaints. She quickly adapted to the team’s culture and was praised for her proactive approach to problem-solving.",
        },
        {
          date: new Date("2021-03-01"),
          description:
            "March 2021: After successfully resolving a series of customer complaints about delayed service, Jane led her first training session for the team. The session focused on improving communication skills and understanding the client’s expectations. The training was a success and resulted in a noticeable improvement in the team's service quality ratings.",
        },
        {
          date: new Date("2021-06-01"),
          description:
            "June 2021: Jane played a key role in overseeing a significant service quality audit. During this time, she identified areas where the team was underperforming, particularly in time management. She developed a plan to address these issues, which included real-time feedback, implementing tighter time tracking, and adding accountability measures to improve punctuality and service standards. This led to a 15% increase in customer satisfaction scores.",
        },
        {
          date: new Date("2021-12-01"),
          description:
            "December 2021: Jane was promoted to a Senior Supervisor role due to her excellent performance and dedication. She began to take on a leadership role, managing more significant projects, including overseeing the onboarding of new employees and developing a new mentorship program to help junior supervisors grow within the company.",
        },
        {
          date: new Date("2022-03-01"),
          description:
            "March 2022: The company faced some challenges with service consistency across different shifts. Jane worked closely with the HR and operations teams to design a new system of random quality checks during shifts to ensure consistency. She also introduced a new customer feedback loop to directly collect clients’ concerns. The results were overwhelmingly positive, with a 25% reduction in complaints across her team.",
        },
        {
          date: new Date("2022-07-01"),
          description:
            "July 2022: Jane's leadership was instrumental during the introduction of a new team-wide initiative focused on enhancing employee engagement and morale. As a result of her efforts, team performance improved, and the company was able to reduce turnover by 30%. This achievement earned Jane recognition as Employee of the Year and a permanent place in the leadership development program.",
        },
        {
          date: new Date("2023-11-01"),
          description:
            "November 2023: Jane was promoted to Team Lead, responsible for overseeing three teams. She was given a larger portfolio of clients and started managing several high-value accounts. Under her leadership, her teams achieved a 98% satisfaction rate in client surveys and maintained an average service quality rating of 9/10. Jane was also tasked with redesigning the team's training materials to better reflect the company's values of compliance and customer service excellence.",
        },
        {
          date: new Date("2024-03-01"),
          description:
            "March 2024: Jane has now set her sights on a management position. She is currently working on a series of leadership development projects and strategic planning for the upcoming fiscal year. She continues to be a key asset to the company, demonstrating a strong commitment to personal growth, client satisfaction, and employee development.",
        },
      ],
    });

    console.log("Seeding completed.");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
