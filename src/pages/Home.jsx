import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyCard from '../components/CompanyCard';
import Filters from '../components/Filter';
import Loader from '../components/Loader';

const Home = () => {
    const [companies, setCompanies] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [industry, setIndustry] = useState('');

    const [sort, setSort] = useState('name-asc');

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    useEffect(() => {
        axios.get('/db.json')
            .then(res => {
                const incoming = res.data;
                const arr = Array.isArray(incoming)
                    ? incoming
                    : Array.isArray(incoming?.data)
                        ? incoming.data
                        : incoming
                            ? [incoming]
                            : [];
                setCompanies(arr);
                setFiltered(arr);
            })
            .finally(() => setLoading(false));
    }, []);

    const applyFiltersAndSort = (list, s, ind, sortKey) => {
        let data = Array.isArray(list) ? [...list] : [];

        if (s) {
            const q = s.toLowerCase();
            data = data.filter(c => (c?.name ?? '').toLowerCase().includes(q));
        }

        if (ind) {
            data = data.filter(c => c?.industry === ind);
        }

        switch (sortKey) {
            case 'name-asc':
                data.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? ''));
                break;
            case 'name-desc':
                data.sort((a, b) => (b?.name ?? '').localeCompare(a?.name ?? ''));
                break;
            case 'emp-asc':
                data.sort((a, b) => (a?.employees ?? 0) - (b?.employees ?? 0));
                break;
            case 'emp-desc':
                data.sort((a, b) => (b?.employees ?? 0) - (a?.employees ?? 0));
                break;
            default:
                break;
        }

        return data;
    };

    useEffect(() => {
        const next = applyFiltersAndSort(companies, search, industry, sort);
        setFiltered(next);
        setPage(1);
    }, [companies, search, industry, sort, pageSize]);

    const handleSearch = (e) => setSearch(e.target.value);
    const handleIndustry = (e) => setIndustry(e.target.value);
    const handleSort = (e) => setSort(e.target.value);
    const handlePageSize = (e) => setPageSize(Number(e.target.value));

    // ✅ Safety guards so map() is always on an array
    const safeFiltered = Array.isArray(filtered) ? filtered : [];
    const totalPages = Math.max(1, Math.ceil(safeFiltered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageItems = safeFiltered.slice(start, start + pageSize);

    return (
        <div className="container mx-auto py-8 px-4">
            {/* ✅ Upgraded heading: readable, modern color, well-seen letters */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-wide drop-shadow-sm font-[Inter]">
                    Companies Directory
                </h1>
            </div>

            <Filters
                search={search}
                handleSearch={handleSearch}
                industry={industry}
                handleIndustry={handleIndustry}
                companies={companies}
                sort={sort}
                handleSort={handleSort}
                pageSize={pageSize}
                handlePageSize={handlePageSize}
            />

            {loading ? (
                <Loader />
            ) : (
                <>
                    {safeFiltered.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-6">
                                {pageItems.map((company, index) => (
                                    <CompanyCard key={company?.id ?? `${company?.name}-${index}`} company={company} />
                                ))}

                            </div>

                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                                >
                                    Prev
                                </button>

                                <span className="text-sm text-gray-600">
                                    Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                                </span>

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center mt-10">No companies found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
