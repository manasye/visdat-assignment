import React from "react";

const News = () => {
  const data = [
    {
      title: "Hooq files for liquidation",
      desc:
        "On-demand video streaming service Hooq said on Friday it has filed for liquidation...",
      link:
        "https://techcrunch.com/2020/03/27/streaming-service-hooq-files-for-liquidation/",
      logo:
        "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1577855469/ju7cwstpcd0pviwqsbyu.jpg"
    },
    {
      title: "Coronavirus drives Indonesia's Traveloka to lay off staff",
      desc:
        "Travel booking service Traveloka, has been forced to lay off a significant portion of its staff...",
      link:
        "https://asia.nikkei.com/Business/Startups/Coronavirus-drives-Indonesia-s-Traveloka-to-lay-off-staff",
      logo:
        "https://mmc.tirto.id/image/otf/1024x535/2019/04/12/logo-traveloka-traveloka.com_ratio-16x9.jpg"
    },
    {
      title: "Airy to Shut Down Business Permanently",
      desc:
        "Such unfortunate news came from the local OTA (Online Travel Agency) industry. Airy or Airy Rooms....",
      link:
        "https://dailysocial.id/post/airy-to-shut-down-business-permanently-putting-other-otas-in-jeopardy",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Logo_Airy_rooms_com.png"
    },
    {
      title: "SweetEscape cuts at least 30% of workforce",
      desc:
        "SweetEscape has laid off a considerable proportion of its employees...",
      link:
        "https://www.dealstreetasia.com/stories/sweetescape-layoffs-184295/",
      logo:
        "https://member.id/wp-content/uploads/2019/08/SweetEscape-Logo-Black.png"
    }
  ];

  const openLink = link => {
    console.log(link);
    window.open(link, "_blank");
  };

  return (
    <div className="news-wrapper">
      <h3>News about Startup Layoff</h3>
      {data.map(n => (
        <div className="news" key={n.title}>
          <img src={n.logo} alt="" />
          <div>
            <h4 onClick={() => openLink(n.link)}>{n.title}</h4>
            <p>{n.desc}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default News;
