'use client';

import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

const membersData = [
    { firstName: 'Thida', lastName: 'Sok', email: 'sokthida168@gmail.com', phone: '016 689 732', joinDate: '1/2/2003' },
    { firstName: 'Vuth', lastName: 'Meas', email: 'measvuth168@gmail.com', phone: '016 689 733', joinDate: '1/2/2003' },
    { firstName: 'Sovann', lastName: 'Da', email: 'dasovann168@gmail.com', phone: '016 689 734', joinDate: '1/2/2003' },
    { firstName: 'Dara', lastName: 'Sam', email: 'samdara168@gmail.com', phone: '016 689 735', joinDate: '1/2/2004' },
    { firstName: 'Oudom', lastName: 'Ty', email: 'tyoudom168@gmail.com', phone: '016 689 737', joinDate: '1/2/2003' },
    { firstName: 'Mike', lastName: 'Catty', email: 'cattymike168@gmail.com', phone: '016 683 732', joinDate: '1/2/2003' },
];

export default function MemberManagementPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    Add Member
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    First name <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Last name <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Email <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Phone number <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Join Date <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-gray-700">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                                    Action <ArrowDown size={14} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {membersData.map((member, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{member.firstName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{member.lastName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            Edit
                                        </button>
                                        <button className="px-4 py-1.5 bg-brand-red text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
