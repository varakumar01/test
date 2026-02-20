import React from 'react';

const CommandOutput = ({ type, data }) => {
  switch (type) {
    case 'help':
      return (
        <div className="terminal-output">
          <div>Available commands:</div>
          <div className="mt-2">
            <div>  <span className="text-green-400">ls</span>                  - List available portfolio sections</div>
            <div>  <span className="text-green-400">cat projects</span>       - View projects</div>
            <div>  <span className="text-green-400">cat github</span>         - View GitHub profile</div>
            <div>  <span className="text-green-400">cat skills</span>         - View skills</div>
            <div>  <span className="text-green-400">cat experience</span>     - View work experience</div>
            <div>  <span className="text-green-400">cat certifications</span> - View certifications</div>
            <div>  <span className="text-green-400">cat social</span>         - View social media links</div>
            <div>  <span className="text-green-400">whoami</span>             - Display user information</div>
            <div>  <span className="text-green-400">neofetch</span>           - Display system information</div>
            <div>  <span className="text-green-400">clear</span>              - Clear terminal screen</div>
            <div>  <span className="text-green-400">help</span>               - Show this help message</div>
          </div>
          <div className="mt-2">Tip: You can also type command names directly (e.g., 'projects' instead of 'cat projects')</div>
        </div>
      );

    case 'ls':
      return (
        <div className="terminal-output">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-blue-400">Projects</div>
            <div className="text-blue-400">Github</div>
            <div className="text-blue-400">Skills</div>
            <div className="text-blue-400">Certifications</div>
            <div className="text-blue-400">Social</div>
          </div>
        </div>
      );

    case 'whoami':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold">{data.user.name}</div>
          <div className="text-yellow-400">{data.user.role}</div>
          <div className="mt-2">{data.user.bio}</div>
        </div>
      );

    case 'projects':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-3">Projects:</div>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4 border-l-2 border-green-600 pl-3">
              <div className="text-yellow-400 font-bold">{project.name}</div>
              <div className="text-gray-400 text-sm mt-1">Type: {project.type}</div>
              <div className="mt-1">{project.description}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="text-cyan-400 text-sm">[{tech}]</span>
                ))}
              </div>
              <div className="mt-1 text-green-500 text-sm">Status: {project.status}</div>
            </div>
          ))}
        </div>
      );

    case 'github':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-3">GitHub Profile:</div>
          <div className="mb-2">
            <span className="text-gray-400">Username:</span> <span className="text-white">{data.github.username}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400">Profile:</span> <a href={data.github.profile} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{data.github.profile}</a>
          </div>
          <div className="mt-3 text-yellow-400 font-bold">Statistics:</div>
          <div className="ml-3 mt-1">
            <div><span className="text-gray-400">Repositories:</span> {data.github.stats.repos}</div>
            <div><span className="text-gray-400">Contributions:</span> {data.github.stats.contributions}</div>
            <div><span className="text-gray-400">Followers:</span> {data.github.stats.followers}</div>
          </div>
          <div className="mt-3 text-yellow-400 font-bold">Notable Repositories:</div>
          <div className="ml-3 mt-1">
            {data.github.repositories.map((repo, idx) => (
              <div key={idx} className="text-cyan-400">• {repo}</div>
            ))}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-3">Skills & Expertise:</div>
          {Object.entries(data.skills).map(([category, skillList], index) => (
            <div key={index} className="mb-3">
              <div className="text-yellow-400 font-bold">{category}:</div>
              <div className="ml-3 mt-1 grid grid-cols-2 gap-2">
                {skillList.map((skill, idx) => (
                  <div key={idx} className="text-cyan-400">• {skill}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'certifications':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-3">Certifications:</div>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-3 border-l-2 border-yellow-600 pl-3">
              <div className="text-yellow-400 font-bold">{cert.name}</div>
              <div className="text-gray-400">Issuer: {cert.issuer}</div>
              <div className="text-gray-400">Year: {cert.year}</div>
              <div className={`text-sm ${cert.status === 'Certified' ? 'text-green-500' : 'text-orange-500'}`}>
                Status: {cert.status}
              </div>
            </div>
          ))}
        </div>
      );

    case 'social':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-3">Social Media & Contact:</div>
          <div className="space-y-2">
            <div>
              <span className="text-gray-400">GitHub:</span>{' '}
              <a href={data.social.github} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.github}
              </a>
            </div>
            <div>
              <span className="text-gray-400">LinkedIn:</span>{' '}
              <a href={data.social.linkedin} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.linkedin}
              </a>
            </div>
            <div>
              <span className="text-gray-400">Twitter:</span>{' '}
              <a href={data.social.twitter} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.twitter}
              </a>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>{' '}
              <a href={`mailto:${data.social.email}`} className="text-blue-400 underline">
                {data.social.email}
              </a>
            </div>
          </div>
        </div>
      );

    case 'neofetch':
      return (
        <div className="terminal-output font-mono">
          <div className="flex gap-8">
            <div className="text-green-500">
              <pre>{`
       _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$."."
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`""""""         
`}</pre>
            </div>
            <div className="text-sm space-y-1">
              <div><span className="text-cyan-400">User:</span> {data.user.username}@kali</div>
              <div><span className="text-cyan-400">Role:</span> {data.user.role}</div>
              <div><span className="text-cyan-400">OS:</span> Kali Linux</div>
              <div><span className="text-cyan-400">Shell:</span> bash</div>
              <div><span className="text-cyan-400">Projects:</span> {data.projects.length}</div>
              <div><span className="text-cyan-400">Skills:</span> {Object.keys(data.skills).length} categories</div>
              <div><span className="text-cyan-400">Certifications:</span> {data.certifications.length}</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CommandOutput;
