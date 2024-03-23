import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const HomeTab = () => {
  return (
    <>
      <div
        className="w-full gap-3 flex flex-col items-center justify-center"
        id="channelHomeTabDiv"
      >
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          className="py-5 px-3 border-2 border-solid border-white rounded-sm w-full bg-gray-800"
        >
          {my_markdown}
        </Markdown>
      </div>
    </>
  );
};

const my_markdown = `
<div align="center">
<img src=https://user-images.githubusercontent.com/77043443/193553031-add42aeb-63ba-4c8e-9eb3-5b5f315ccc26.png />
</div>

<!--Profile Count Badge-->
<p align="left">
  <img src="https://komarev.com/ghpvc/?username=karanBRAVO&label=Profile%20views&color=770677&style=for-the-badge&logo=star" alt="karanBRAVO" style="padding-right:20px;" />
</p>

---
<br />

<!--Start Intro-->
# <img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/> Hello World !
<h1 align="center">Hi 👋, I'm Karan Yadav</h1>

<p align="left">I am a Full Stack Developer and Machine Learning Enthusiast with a huge love for Python, React.js (Next.js), Node.js, RDBMS, REST API, etc. </p>

- 🌱 I’m currently learning **AI (Aritficial Intelligence) and Devops**

- 💬 Ask me about **React.js, Next.js, Python**

<!--Competetive programming Section--> 

<h2 align="center">💻 Competetive Programming 💻</h2>
<div align="center">

<a href="https://codeforces.com/profile/karanyadav_bravo98" target="_blank">
  <img src="https://img.shields.io/badge/Codeforces-1F8ACB?style=for-the-badge&logo=codeforces&logoColor=white" alt="Codeforces" style="margin-bottom: 5px;" />
</a>

<a href="https://leetcode.com/Karan-Yadav/" target="_blank">
  <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white" alt="LeetCode" style="margin-bottom: 5px;" />
</a>

<a href="https://atcoder.jp/users/Karan_Yadav" target="_blank">
  <img src="https://img.shields.io/badge/AtCoder-00ACD7?style=for-the-badge&logo=none&logoColor=white" alt="AtCoder" style="margin-bottom: 5px;" />
</a>

</div>

<br />

<!--Languages and Tools Section-->       
<h2 align="center">Lᴀɴɢᴜᴀɢᴇs ᴀɴᴅ Tᴏᴏʟs</h2> 
<p align="center">
<img width="500px"  src="https://skillicons.dev/icons?i=py,java,html,css,nodejs,django,solidity,postgres,vscode,docker,aws,postman,linux,git,kubernetes,c,vim,windows,vite,vercel,ts,threejs,tensorflow,tailwind,sklearn,sublime,redux,redis,react,opencv,npm,nodejs,nextjs,mongodb,materialui,md,kali,kafka,js,graphql,flask,firebase,express,cpp,blender,androidstudio&perline=10"  />
</p>
<br />

<!--Trophies Section-->   
<h2 align="center">🏆 Gɪᴛʜᴜʙ Tʀᴏᴘʜɪᴇs 🏆</h2>
<p align="center">
  <a href="https://github.com/karanBRAVO/github-profile-trophy">
    <img src="https://github-profile-trophy.vercel.app/?username=karanBRAVO&row=2&column=6&margin-w=20&margin-h=20" alt="GitHub Trophies">
  </a>
</p>
<br />

<!--Github stats Table--> 
<h2 align="center">📊 Gɪᴛʜᴜʙ Sᴛᴀᴛs 📊</h2>

<table width="100%">
  <tr>
    <td width="50%">
      <h3 align="center"><strong>Gɪᴛʜᴜʙ Sᴛᴀᴛs</strong></h3>
      <p align="center">
        <a href="https://github.com/karanBRAVO">
          <img align="center" src="https://github-readme-stats.vercel.app/api?username=karanBRAVO&count_private=true&show_icons=true&theme=nightowl" alt="GitHub Stats" />
        </a>
      </p>
    </td>
    <td width="50%">
      <h3 align="center"><strong>Sᴛʀᴇᴀᴋ Sᴛᴀᴛs</strong></h3>
      <p align="center">
        <a href="https://github.com/karanBRAVO">
          <img align="center" src="https://streak-stats.demolab.com?user=karanBRAVO&theme=nightowl" alt="Streak Stats" />
        </a>
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center"><strong>Lᴀᴛᴇsᴛ Pʀᴏᴊᴇᴄᴛ</strong></h3>
      <p align="center">
        <a href="https://github.com/karanBRAVO/VidX">
          <img align="center" width="470" src="https://github-readme-stats.vercel.app/api/pin/?username=karanBRAVO&repo=VidX&theme=nightowl&show_owner=true" alt="VidX" />
        </a>
      </p>
    </td>
    <td width="50%">
      <h3 align="center"><strong>Tᴏᴘ Cᴏɴᴛʀɪʙᴜᴛɪᴏɴs</strong></h3>
      <p align="center">
        <a href="https://github.com/karanBRAVO">
          <img align="center" src="https://github-contributor-stats.vercel.app/api?username=karanBRAVO&limit=3&theme=nightowl&show_owner=true&combine_all_yearly_contributions=true" alt="Top Repo" />
        </a>
      </p>
    </td>
  </tr>
</table>
<br />

<!--Contribution Graph-->
<h2 align="center">📈 Cᴏɴᴛʀɪʙᴜᴛɪᴏɴ Gʀᴀᴘʜ 📈</h2>
<div align="center">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=karanBRAVO&bg_color=011627&color=79d3c3&line=c792ea&point=ffeb95&area=true&hide_border=false" border-radius="15">
</div>

<!--Contact Section--> 

<h2 align="center">🤝 Cᴏɴɴᴇᴄᴛ Wɪᴛʜ Mᴇ 🤝 </h2>
<div align="center">

<a href="www.linkedin.com/in/karanyadav98" target="_blank">
  <img src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt=linked in style="margin-bottom: 5px;" />
</a>
  
<a href="mailto:xpresskaran98@gmail.com" target="_blank">
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt=xpresskaran98@gmail.com mail style="margin-bottom: 5px;" />
</a>

<a href="www.youtube.com/@K.Y_KaranYadav98" target="_blank">
  <img src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt=youtube style="margin-bottom: 5px;" />
</a>

</div>

<br/>

<!--Ending--> 
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=65&section=footer"/>
</p>
`;

export default HomeTab;
