import type { FC } from 'react'

const About: FC = () => {
  return (
    <div className="border-1 p-3 mb-4 shadow-xl rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold">Important information about Habbit</h2>
      <div className="flex flex-col gap-5">
        <div>
          Habbit is a personal project to track well... Habits;
          <br />
          It is not meant to be a full fledged application, but rather a simple tool to help me
          track my habits - With some pomodoro timer features and data tracking for me to understand
          my trends and habits better.
        </div>
        <div>
          <p className="text-xl ">Is my data stored anywhere? Why do i need to register?</p>
          <p>
            Your data is stored in a database, but only you have access to it. I do not share or
            sell your data to anyone. The reason you need to register is to be able to access your
            data from any device and to keep it safe.
          </p>
        </div>
        <div>
          <p className="text-xl">Is this application open source?</p>
          <p>
            Yes! You can find the code on my{' '}
            <a
              href="github.com/medeirosvictor/habbit"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
