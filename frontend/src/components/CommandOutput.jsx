import React from 'react';

const CommandOutput = ({ type, data, showAll, showLong }) => {
  switch (type) {
    case 'help':
      return (
        <div className="terminal-output">
          <div>Available commands:</div>
          <div className="mt-1">
            <div>  <span className="text-green-400">ls</span>         - List available portfolio sections</div>
            <div>  <span className="text-green-400">cat</span>        - Display detailed information about a section</div>
            <div className="ml-8 text-gray-400">Examples:</div>
            <div className="ml-8 text-gray-400">  cat about</div>
            <div className="ml-8 text-gray-400">  cat experience</div>
            <div className="ml-8 text-gray-400">  cat projects</div>
            <div className="ml-8 text-gray-400">  cat skills</div>
            <div>  <span className="text-green-400">whoami</span>     - Display username</div>
            <div>  <span className="text-green-400">status</span>     - Display current status</div>
            <div>  <span className="text-green-400">impact</span>     - Show career impact metrics</div>
            <div>  <span className="text-green-400">neofetch</span>   - Display system information</div>
            <div>  <span className="text-green-400">clear</span>      - Clear terminal screen</div>
            <div>  <span className="text-green-400">help</span>       - Show this help message</div>
          </div>
          <div className="mt-1 text-gray-400">Tip: You can type section names directly without 'cat'</div>
        </div>
      );

    case 'ls':
      const sections = ['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Gitlab', 'Known-Issues', 'Resume', 'Contact'];
      const hiddenSections = ['.bash_history', '.vimrc', '.bashrc'];
      
      if (showLong) {
        return (
          <div className="terminal-output">
            <div className="text-sm">total {showAll ? sections.length + hiddenSections.length : sections.length}</div>
            {showAll && hiddenSections.map((section, idx) => (
              <div key={idx} className="text-gray-500 text-sm">
                drwxr-xr-x 1 varakumar varakumar  512 Jan 15 10:30 {section}
              </div>
            ))}
            {sections.map((section, idx) => (
              <div key={idx} className="text-sm">
                drwxr-xr-x 1 varakumar varakumar  512 Jan 15 10:30 <span className="text-blue-400">{section}</span>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="terminal-output">
            <div className="grid grid-cols-3 gap-4">
              {showAll && hiddenSections.map((section, idx) => (
                <div key={idx} className="text-gray-500">{section}</div>
              ))}
              {sections.map((section, idx) => (
                <div key={idx} className="text-blue-400">{section}</div>
              ))}
            </div>
          </div>
        );
      }

    case 'whoami':
      return (
        <div className="terminal-output">
          <div>{data.user.username}</div>
        </div>
      );
    
    case 'about':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold">{data.user.name}</div>
          <div className="text-yellow-400">{data.user.role}</div>
          <div className="mt-1">{data.user.bio}</div>
        </div>
      );

    case 'status':
      return (
        <div className="terminal-output">
          <div>
            <span className="bg-red-600 text-white px-2 py-1">{data.statusMessage.status}</span>
            <span className="ml-2">{data.statusMessage.message}</span>
          </div>
        </div>
      );

    case 'impact':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Career Impact:</div>
          {data.impact.map((item, idx) => (
            <div key={idx} className="text-cyan-400">• {item}</div>
          ))}
        </div>
      );

    case 'issues':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Known Issues:</div>
          {data.knownIssues.map((issue, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${issue.status === 'ongoing' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
              <span className="text-yellow-400">{issue.text}</span>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Contact:</div>
          <div className="space-y-1">
            <div>
              <span className="text-gray-400">Email:</span>{' '}
              <a href={`mailto:${data.social.email}`} className="text-blue-400 underline">
                {data.social.email}
              </a>
            </div>
            <div>
              <span className="text-gray-400">GitLab:</span>{' '}
              <a href={data.social.gitlab} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.gitlab}
              </a>
            </div>
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
          </div>
        </div>
      );

    case 'gitlab-help':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-1">Gitlab Commands:</div>
          <div className="ml-3">
            <div><span className="text-cyan-400">gitlab --featured</span>  # show only top projects</div>
            <div><span className="text-cyan-400">gitlab --skills</span>    # list tech used in Gitlab</div>
            <div><span className="text-cyan-400">gitlab --recent</span>    # show recent projects</div>
          </div>
        </div>
      );

    case 'gitlab':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">GitLab Profile:</div>
          <div className="mb-1">
            <span className="text-gray-400">Username:</span> <span className="text-white">{data.gitlab.gitlab_username}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">Profile:</span> <a href={data.gitlab.profile} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{data.gitlab.profile}</a>
          </div>
          <div className="mt-2 text-yellow-400 font-bold">Statistics:</div>
          <div className="ml-3">
            <div><span className="text-gray-400">Repositories:</span> {data.gitlab.stats.repos}</div>
            <div><span className="text-gray-400">Contributions:</span> {data.gitlab.stats.contributions}</div>
            <div><span className="text-gray-400">Focus:</span> {data.gitlab.stats.focus}</div>
          </div>
          <div className="mt-2 text-yellow-400 font-bold">Notable Repositories:</div>
          <div className="ml-3">
            {data.gitlab.repositories.map((repo, idx) => (
              <div key={idx} className="text-cyan-400">• {repo}</div>
            ))}
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            Try 'gitlab --help' for more options
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Projects:</div>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3 border-l-2 border-green-600 pl-3">
              <div className="text-yellow-400 font-bold">{project.name}</div>
              <div className="text-gray-400 text-sm">Type: {project.type}</div>
              <div className="mt-1">{project.description}</div>
              <div className="mt-1 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="text-cyan-400 text-sm">[{tech}]</span>
                ))}
              </div>
              <div className="text-green-500 text-sm">Status: {project.status}</div>
            </div>
          ))}
        </div>
      );

    case 'github':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">GitHub & GitLab Profile:</div>
          <div className="mb-1">
            <span className="text-gray-400">GitHub:</span> <span className="text-white">{data.github.username}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">GitLab:</span> <span className="text-white">{data.github.gitlab}</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">Profile:</span> <a href={data.github.profile} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{data.github.profile}</a>
          </div>
          <div className="mt-2 text-yellow-400 font-bold">Statistics:</div>
          <div className="ml-3">
            <div><span className="text-gray-400">Repositories:</span> {data.github.stats.repos}</div>
            <div><span className="text-gray-400">Contributions:</span> {data.github.stats.contributions}</div>
            <div><span className="text-gray-400">Focus:</span> {data.github.stats.focus}</div>
          </div>
          <div className="mt-2 text-yellow-400 font-bold">Notable Repositories:</div>
          <div className="ml-3">
            {data.github.repositories.map((repo, idx) => (
              <div key={idx} className="text-cyan-400">• {repo}</div>
            ))}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Skills & Expertise:</div>
          {Object.entries(data.skills).map(([category, skillList], index) => (
            <div key={index} className="mb-2">
              <div className="text-yellow-400 font-bold">{category}:</div>
              <div className="ml-3 grid grid-cols-2 gap-2">
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
          <div className="text-green-400 font-bold mb-2">Certifications:</div>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 border-l-2 border-yellow-600 pl-3">
              <div className="text-yellow-400 font-bold">{cert.name}</div>
              <div className="text-gray-400">Issuer: {cert.issuer}</div>
              <div className={`text-sm ${cert.status === 'Certified' ? 'text-green-500' : 'text-orange-500'}`}>
                Status: {cert.status}
              </div>
            </div>
          ))}
        </div>
      );

    case 'experience':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Work Experience:</div>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3 border-l-2 border-cyan-600 pl-3">
              <div className="text-yellow-400 font-bold text-lg">{exp.role}</div>
              <div className="text-cyan-400 font-bold">{exp.company}</div>
              <div className="text-gray-400 text-sm">
                {exp.location} • {exp.duration}
              </div>
              <div className="mt-1">{exp.description}</div>
              <div className="mt-1">
                <div className="text-green-400 text-sm font-bold">Key Responsibilities:</div>
                <div className="ml-3">
                  {exp.responsibilities.map((resp, idx) => (
                    <div key={idx} className="text-gray-300 text-sm">• {resp}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'social':
      return (
        <div className="terminal-output">
          <div className="text-green-400 font-bold mb-2">Social Media & Contact:</div>
          <div className="space-y-1">
            <div>
              <span className="text-gray-400">Email:</span>{' '}
              <a href={`mailto:${data.social.email}`} className="text-blue-400 underline">
                {data.social.email}
              </a>
            </div>
            <div>
              <span className="text-gray-400">GitHub:</span>{' '}
              <a href={data.social.github} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.github}
              </a>
            </div>
            <div>
              <span className="text-gray-400">GitLab:</span>{' '}
              <a href={data.social.gitlab} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.gitlab}
              </a>
            </div>
            <div>
              <span className="text-gray-400">LinkedIn:</span>{' '}
              <a href={data.social.linkedin} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                {data.social.linkedin}
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
              <div><span className="text-cyan-400">User:</span> {data.user.username}</div>
              <div><span className="text-cyan-400">Role:</span> Cybersecurity Developer</div>
              <div><span className="text-cyan-400">Specialization:</span> ICS/SCADA Security</div>
              <div><span className="text-cyan-400">Experience:</span> 3+ Years</div>
              <div><span className="text-cyan-400">Primary Stack:</span> Python | NASL | Node.js</div>
              <div><span className="text-cyan-400">Focus:</span> Offensive Automation</div>
              <div><span className="text-cyan-400">Target Cert:</span> OSCP</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CommandOutput;
