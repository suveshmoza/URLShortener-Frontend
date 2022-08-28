import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

const LinkResult = ({ inputValue }) => {
	const [shortenLink, setShortenLink] = useState('');
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}shortUrls`,
				{
					fullUrl: inputValue,
				}
			);
			console.log(data);
			setShortenLink(`${process.env.REACT_APP_BASE_URL}${data.short}`);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (inputValue.length) {
			fetchData();
			setError(false);
		}
	}, [inputValue]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setCopied(false);
		}, 500);
		return () => clearTimeout(timer);
	}, [copied]);

	if (loading) {
		return <p className="noData">Loading...</p>;
	}

	if (error) {
		return <p className="noData">Something went wrong!</p>;
	}

	return (
		<>
			{shortenLink && (
				<div className="result">
					<p>{shortenLink}</p>
					<CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
						<button className={copied ? 'copied' : ''}>
							<i className="fa-solid fa-clipboard "></i>
						</button>
					</CopyToClipboard>
				</div>
			)}
		</>
	);
};

export default LinkResult;
