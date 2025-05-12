import { IPost } from "@/types/allTypes";
import React from "react";

export default function Skeleton() {
  return (
    <div className="flex flex-1 justify-center items-center h-screen w-full">
      <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
        <h2 className="text-white text-xl font-semibold text-center mb-4 w-full">
          Post List
        </h2>
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/30">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Content</th>
              <th className="p-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((d, _) => (
              <tr
                key={_}
                className="border-b border-white/20 hover:bg-white/20 transition animate-pulse mb-2"
              >
                <td className="p-4 bg-white/20 h-6 "></td>
                <td className="p-4 bg-white/20 h-6 "></td>
                <td className="p-4 bg-white/20 h-6 "></td>
                <td className="p-4 bg-white/20 h-6 "></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
          <h2 className="text-white text-xl font-semibold text-center mb-4">Loading...</h2>
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="border-b border-white/30">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Content</th>
                <th className="p-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-white/20 animate-pulse">
                  <td className="p-4 bg-white/20 h-6 rounded"></td>
                  <td className="p-4 bg-white/20 h-6 rounded"></td>
                  <td className="p-4 bg-white/20 h-6 rounded"></td>
                  <td className="p-4 bg-white/20 h-6 rounded"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */
}
