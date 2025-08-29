export default function Home() {
  const topCards = [
    {
      title: "Get started",
      description:
        "Read our getting started guide to get the most out of your Capitalmind subscription.",
    },
    {
      title: "Community",
      description:
        "Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers.",
    },
    {
      title: "Visit website",
      description:
        "Keep up with our latest content on our website.",
    },
  ];

  const blogs = [
    {
      id: 1,
      date: "Apr 18, 2024",
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      content:
        "We are increasing the duration of our Fixed Income portfolios to reflect the current macro conditions...",
    },
    {
      id: 2,
      date: "Apr 06, 2024",
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      content:
        "Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds...",
    },
    {
      id: 3,
      date: "Apr 03, 2024",
      title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
      content:
        "FY24 brought us 24% gains in our Capitalmind Focused portfolio, greatly outperforming Nifty...",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home</h1>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Blog Posts */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-6"
          >
            <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
            <h3 className="text-md font-bold text-gray-800 mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-3">{blog.content}</p>
          
          </div>
        ))}
      </div>
    </div>
  );
}