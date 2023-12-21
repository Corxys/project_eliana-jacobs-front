import gql from "graphql-tag";

const PRACTICES_QUERY = gql`
	query Practices {
		practices {
			data {
				id
				attributes {
					title
					text
					image {
						src {
							data {
								attributes {
									url
									alternativeText
									mime
								}
							}
						}
						link
						copyright
					}
				}
			}
		}
	}
`;

const NEWS_QUERY = gql`
	query News {
		news(pagination: { limit: 100 }) {
			data {
				id
				attributes {
					address {
						name
						street
						cp
						city
					}
					date {
						date
						start
						end
					}
					email
					image {
						src {
							data {
								attributes {
									url
									alternativeText
									mime
								}
							}
						}
						copyright
						link
					}
					publishedAt
					register {
						src
					}
					text
					title
					website
				}
			}
		}
	}
`;

const CATEGORIES_QUERY = gql`
	query Categories {
		categories {
			data {
				attributes {
					index
					name
					placeholder {
						data {
							attributes {
								url
							}
						}
					}
					types {
						data {
							attributes {
								name
							}
						}
					}
				}
				id
			}
		}
	}
`;

const TYPES_QUERY = gql`
	query Types {
		types {
			data {
				id
				attributes {
					index
					name
					categories {
						data {
							id
							attributes {
								name
							}
						}
					}
					image {
						data {
							attributes {
								url
								alternativeText
							}
						}
					}
					layout
				}
			}
		}
	}
`;

const PROJECTS_QUERY = gql`
	query Projects {
		projects(pagination: { limit: 100 }) {
			data {
				id
				attributes {
					index
					categories {
						data {
							attributes {
								name
							}
							id
						}
					}
					date
					link {
						src
					}
					medias {
						copyright
						link
						src {
							data {
								attributes {
									alternativeText
									mime
									url
									formats
								}
							}
						}
						id
					}
					name
					text
					type {
						data {
							id
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

const CV_QUERY = gql`
	query Cv {
		cv {
			data {
				attributes {
					link
				}
			}
		}
	}
`;

export { PRACTICES_QUERY, NEWS_QUERY, CATEGORIES_QUERY, TYPES_QUERY, PROJECTS_QUERY, CV_QUERY };
