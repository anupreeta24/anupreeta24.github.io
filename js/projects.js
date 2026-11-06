/* ==========================================================================
   PROJECTS: all project content lives here (generated from projects-content.md,
   edit either one). index.html renders the cards from this array;
   project.html?id=<id> renders the deep dive for one project.

   Fields
   - id            url-friendly slug, used in project.html?id=...
   - title
   - category      "Analytics & BI" | "Data Engineering" | "AI & ML"
                   (must match a filter button's data-filter in index.html)
   - featured      true = shown under "All" before "View all" is clicked
   - summary       2 sentences for the card
   - tags          tech names (Skills pill style)
   - metrics       exactly 3: { value, label }
   - github        repo url ("" hides the GitHub icon and button)
   - liveLink      published dashboard url ("" hides "View live dashboard")
   - screenshot    image path, e.g. "assets/projects/retail.png" ("" hides the screenshot section)
   - problem       paragraph (deep dive)
   - approach      paragraph (deep dive)
   - architecture  array of { title, detail } pipeline steps (deep dive)
   - results       array of strings (deep dive)
   - learnings     paragraph, shown as "What I Learned" (deep dive)
   ========================================================================== */

const PROJECTS = [
  {
    "id": "omnichannel-retail-analytics",
    "title": "Omnichannel Retail Analytics & Customer Segmentation Dashboard",
    "category": "Analytics & BI",
    "featured": true,
    "summary": "Unified 250K+ monthly online and in-store transactions into one SQL warehouse and Power BI model. Found that online customers cost 28% less to acquire, sizing a $200K quarterly budget shift.",
    "tags": [
      "SQL",
      "Python",
      "Power BI",
      "DAX",
      "Star Schema",
      "RFM Segmentation"
    ],
    "metrics": [
      {
        "value": "250K+",
        "label": "monthly transactions"
      },
      {
        "value": "28%",
        "label": "lower online CAC"
      },
      {
        "value": "$200K",
        "label": "quarterly reallocation sized"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Online and in-store sales lived in separate order and customer tables, so the business couldn't compare channels on acquisition cost, lifetime value, or margin. Every channel question meant a manual, one-off data pull.",
    "approach": "I built a SQL warehouse that merged online and in-store orders and customers into one consistent model, then designed a Power BI star schema on top with DAX measures for CAC, LTV, margin, and repeat rate. I added RFM segmentation to group customers by value, and automated SQL alerts that flag overstock, stockouts, and high-margin weekend clusters.",
    "architecture": [
      {
        "title": "Sources",
        "detail": "Online and in-store order and customer tables"
      },
      {
        "title": "SQL Warehouse",
        "detail": "Unified model over 250K+ monthly transactions"
      },
      {
        "title": "Star Schema",
        "detail": "Power BI model with DAX measures for CAC, LTV, margin, repeat rate"
      },
      {
        "title": "Segmentation",
        "detail": "RFM scoring plus automated SQL inventory alerts"
      },
      {
        "title": "Dashboard",
        "detail": "Channel performance and customer segments in Power BI"
      }
    ],
    "results": [
      "Found online CAC 28% below retail channels",
      "Sized a projected $200K quarterly budget reallocation opportunity",
      "Gave teams one place to track CAC, LTV, margin, and repeat rate by channel",
      "Replaced manual inventory checks with automated alerts for overstock, stockouts, and high-margin weekend clusters"
    ],
    "learnings": "Getting the data model right was most of the work. Once online and in-store data shared one schema, comparing channels became a simple measure instead of a manual reconciliation."
  },
  {
    "id": "churn-propensity-dashboard",
    "title": "Customer Subscription Propensity Model & Churn Risk Dashboard",
    "category": "Analytics & BI",
    "featured": true,
    "summary": "Predicted which subscribers were likely to churn across 500K+ customer records, and used SHAP to explain why. Turned it into a Tableau dashboard that segments 120K+ high-risk customers so retention teams know who to reach first.",
    "tags": [
      "Python",
      "Scikit-learn",
      "SHAP",
      "Tableau"
    ],
    "metrics": [
      {
        "value": "500K+",
        "label": "customer records"
      },
      {
        "value": "120K+",
        "label": "high-risk customers segmented"
      },
      {
        "value": "85%+",
        "label": "precision held"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "The business knew customers were leaving, but not which ones were at risk or why. Without that, retention efforts were broad and reactive.",
    "approach": "I engineered 25+ features from behavior, support, and billing data, then trained and compared eight classifiers using stratified five-fold cross-validation and AUC. I used SHAP to identify what was actually driving churn, and built a Tableau dashboard that groups high-risk customers by risk band, tenure, and product line. To check the model would hold up over time, I simulated weekly retraining with population drift monitoring.",
    "architecture": [
      {
        "title": "Customer Data",
        "detail": "500K+ records across behavior, support, and billing"
      },
      {
        "title": "Feature Engineering",
        "detail": "25+ behavioral, support, and billing features"
      },
      {
        "title": "Modeling",
        "detail": "8 classifiers compared with stratified 5-fold cross-validation and AUC"
      },
      {
        "title": "Explainability",
        "detail": "SHAP to isolate the dominant churn drivers"
      },
      {
        "title": "Dashboard",
        "detail": "Tableau risk bands by tenure and product line"
      }
    ],
    "results": [
      "Compared 8 classifiers on 500K+ customer records",
      "Isolated the dominant churn drivers with SHAP",
      "Segmented 120K+ high-risk customers by risk band, tenure, and product line",
      "Held 85%+ precision across all rolling validation windows with simulated weekly retraining"
    ],
    "learnings": "A churn score on its own isn't actionable. Pairing it with clear drivers and simple risk bands is what turned the model into something a retention team could use. Monitoring drift mattered as much as the first model's accuracy."
  },
  {
    "id": "supply-chain-inventory",
    "title": "Supply Chain Optimization & Inventory Intelligence Platform",
    "category": "Analytics & BI",
    "featured": true,
    "summary": "Built an incremental ETL pipeline loading 15K+ monthly supply chain records into PostgreSQL, running 35% faster than before. Traced a 12% inventory variance back to seasonal Q4 forecasting bias.",
    "tags": [
      "Python",
      "SQL",
      "PostgreSQL",
      "Airflow",
      "Power BI"
    ],
    "metrics": [
      {
        "value": "35%",
        "label": "faster pipeline runtime"
      },
      {
        "value": "99.2%",
        "label": "row-level pass rate"
      },
      {
        "value": "12%",
        "label": "inventory variance traced"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Inventory levels kept drifting away from actual demand, and the pipeline feeding the reports was slow because it reloaded full tables on every run.",
    "approach": "I replaced full-table reloads with incremental watermark logic, so each run only loads what changed. Batched inserts and indexed lookups sped things up further. I added validation rules and reconciliation checks to every batch, then built a time-series reorder model to understand where the inventory variance came from.",
    "architecture": [
      {
        "title": "Source Data",
        "detail": "15K+ monthly supply chain records"
      },
      {
        "title": "Python + SQL ETL",
        "detail": "Incremental watermark loading, orchestrated with Airflow"
      },
      {
        "title": "PostgreSQL",
        "detail": "Batched inserts and indexed lookups"
      },
      {
        "title": "Validation",
        "detail": "Rules and reconciliation checks on every batch"
      },
      {
        "title": "Analysis & Dashboard",
        "detail": "Time-series reorder model with Power BI reporting"
      }
    ],
    "results": [
      "Cut pipeline runtime 35% by removing redundant full-table reloads",
      "Achieved a 99.2% row-level pass rate across all loaded batches",
      "Quantified a 12% inventory variance and traced it to seasonal Q4 demand forecasting bias"
    ],
    "learnings": "Speeding up the pipeline was mostly about doing less work: load only what changed. And the variance wasn't random. Breaking it down by season showed the forecast, not the warehouse, was the problem."
  },
  {
    "id": "medicare-part-d-pipeline",
    "title": "Medicare Part D Prescriber & Drug Analytics Pipeline",
    "category": "Data Engineering",
    "featured": true,
    "summary": "Processed 25M+ CMS Medicare Part D records, covering 983K prescribers and 3,117 drugs, through a medallion-architecture PySpark pipeline on AWS. Served the aggregated metrics to Power BI through a fast, read-optimized RDS layer.",
    "tags": [
      "PySpark",
      "AWS S3",
      "Amazon RDS",
      "PostgreSQL",
      "Docker",
      "Power BI"
    ],
    "metrics": [
      {
        "value": "25M+",
        "label": "records processed"
      },
      {
        "value": "983K",
        "label": "prescribers covered"
      },
      {
        "value": "3,117",
        "label": "drugs analyzed"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "CMS Part D data is huge and split across four source tables. It's too big for spreadsheets and too slow to query raw for dashboards.",
    "approach": "I built a medallion-architecture pipeline in PySpark on AWS S3, ingesting the four CMS Part D tables incrementally and storing each layer as partitioned Parquet. Aggregated metrics were published to Amazon RDS as a serving layer, so Power BI never had to touch the raw data. I wrote reusable JDBC connectors, config-driven environments, and validation checks with structured logging, and used Docker for consistent runs.",
    "architecture": [
      {
        "title": "CMS Sources",
        "detail": "4 Part D source tables, ingested incrementally"
      },
      {
        "title": "S3 Medallion Layers",
        "detail": "Bronze, silver, and gold tables in partitioned Parquet"
      },
      {
        "title": "PySpark Transforms",
        "detail": "Cleaning, joins, and aggregations"
      },
      {
        "title": "Amazon RDS",
        "detail": "Read-optimized serving layer for aggregated metrics"
      },
      {
        "title": "Power BI",
        "detail": "Prescriber and drug dashboards"
      }
    ],
    "results": [
      "Processed 25M+ prescriber-drug records into partitioned Parquet tables",
      "Published aggregated metrics to Amazon RDS as a read-optimized layer for Power BI",
      "Built reusable JDBC connectors and config-driven environments",
      "Added validation checks and structured logging for pipeline observability"
    ],
    "learnings": "At 25M+ rows, design choices like partitioning and a separate serving layer matter more than clever code. Keeping dashboards off the raw data made them fast and made the pipeline easier to debug."
  },
  {
    "id": "youtube-aws-pipeline",
    "title": "YouTube End-to-End AWS Data Pipeline & Analytics",
    "category": "Data Engineering",
    "featured": true,
    "summary": "Automated a serverless AWS pipeline that turns messy, multilingual YouTube data from three countries into clean, queryable tables. Converting to partitioned Parquet cut Athena query cost by roughly 60%.",
    "tags": [
      "AWS S3",
      "Lambda",
      "Glue",
      "PySpark",
      "Athena",
      "Tableau"
    ],
    "metrics": [
      {
        "value": "300K+",
        "label": "rows converted to Parquet"
      },
      {
        "value": "~60%",
        "label": "lower query cost"
      },
      {
        "value": "3",
        "label": "countries unified"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "The data arrived as inconsistent JSON and CSV files in different languages and formats per country, so cross-country comparisons weren't possible without heavy manual cleanup.",
    "approach": "I set up Lambda triggers so new files in S3 kick off processing automatically, with Glue Crawlers cataloging the data and PySpark Glue ETL jobs normalizing every source into one unified schema. I converted the output to partitioned Parquet and modeled curated Athena tables for category engagement and cross-country virality, ready for Tableau.",
    "architecture": [
      {
        "title": "Raw Files in S3",
        "detail": "Multilingual JSON and CSV from 3 countries"
      },
      {
        "title": "Lambda Triggers",
        "detail": "Start processing automatically on new uploads"
      },
      {
        "title": "Glue Crawlers + ETL",
        "detail": "PySpark jobs normalize everything into one schema"
      },
      {
        "title": "Partitioned Parquet",
        "detail": "300K+ rows stored for efficient querying"
      },
      {
        "title": "Athena + Tableau",
        "detail": "Curated tables for engagement and virality analysis"
      }
    ],
    "results": [
      "Automated the full S3 to Athena pipeline with no manual steps",
      "Normalized multilingual JSON and CSV from three countries into one schema",
      "Cut Athena bytes scanned and query cost by roughly 60%",
      "Delivered curated tables for downstream Tableau reporting"
    ],
    "learnings": "File format is a cost decision. Switching from raw CSV and JSON to partitioned Parquet was a small change with the biggest payoff in the whole project."
  },
  {
    "id": "air-quality-weather-warehouse",
    "title": "Air Quality & Weather Analytics Warehouse",
    "category": "Data Engineering",
    "featured": false,
    "summary": "Integrated multi-source air quality and weather feeds through Talend into a PostgreSQL OLTP schema and a snowflake-schema OLAP warehouse. Built Tableau dashboards tracking how pollution and weather move together.",
    "tags": [
      "Talend",
      "PostgreSQL",
      "Dimensional Modeling",
      "Snowflake Schema",
      "Tableau"
    ],
    "metrics": [
      {
        "value": "2",
        "label": "schemas designed (OLTP + OLAP)"
      },
      {
        "value": "Multi-source",
        "label": "feeds integrated"
      },
      {
        "value": "Automated",
        "label": "schema and freshness checks"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Air quality and weather data came from separate feeds in different formats, which made it hard to study how the two relate.",
    "approach": "I built Talend ETL jobs to bring every feed into standardized staging tables, then designed a PostgreSQL OLTP schema with referential integrity so raw records land cleanly. For analysis, I modeled a separate OLAP warehouse in a snowflake schema using surrogate keys, conformed dimensions, and hierarchies, and built Tableau dashboards on top with automated schema and freshness checks.",
    "architecture": [
      {
        "title": "Source Feeds",
        "detail": "Air quality and weather data from multiple sources"
      },
      {
        "title": "Talend ETL",
        "detail": "Jobs load standardized staging tables"
      },
      {
        "title": "PostgreSQL OLTP",
        "detail": "Schema with referential integrity for clean ingestion"
      },
      {
        "title": "OLAP Warehouse",
        "detail": "Snowflake schema with surrogate keys and conformed dimensions"
      },
      {
        "title": "Tableau",
        "detail": "Pollution and weather correlation KPIs"
      }
    ],
    "results": [
      "Integrated multi-source air quality and weather feeds into standardized staging tables",
      "Designed an OLTP schema with referential integrity for clean ingestion",
      "Modeled an OLAP snowflake-schema warehouse with conformed dimensions and hierarchies",
      "Built Tableau dashboards tracking pollution and weather correlation KPIs"
    ],
    "learnings": "Keeping ingestion (OLTP) and analysis (OLAP) as two separate layers kept each one simple, and made the dashboards much easier to trust."
  },
  {
    "id": "karaoke-multi-agent",
    "title": "Automated Multi-Agent Karaoke Video Generator",
    "category": "AI & ML",
    "featured": true,
    "summary": "Orchestrated a 5-agent LangGraph pipeline that turns songs into karaoke videos across audio and video stages. Cut OpenAI spend 40% and runtime 60%, while reaching a 95% completion rate across 50+ media files.",
    "tags": [
      "Python",
      "LangGraph",
      "Whisper",
      "GPT-4o",
      "Streamlit"
    ],
    "metrics": [
      {
        "value": "40%",
        "label": "lower OpenAI spend"
      },
      {
        "value": "60%",
        "label": "faster runtime"
      },
      {
        "value": "95%",
        "label": "completion rate"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Multi-step media pipelines are expensive to run and tend to fail halfway through. Every failure meant rerunning the whole thing from the start.",
    "approach": "I orchestrated five agents in LangGraph with conditional routing and state checkpointing across the audio and video stages. Token-aware batching and async execution brought cost and runtime down, benchmarked on identical inputs. I added retries and fallbacks at every agent boundary, and persisted agent state so a failure resumes from the failed step instead of restarting.",
    "architecture": [
      {
        "title": "Media Input",
        "detail": "Audio and video files"
      },
      {
        "title": "Whisper",
        "detail": "Speech-to-text transcription"
      },
      {
        "title": "LangGraph Agents",
        "detail": "5 agents with conditional routing"
      },
      {
        "title": "State Checkpointing",
        "detail": "Resume from the failed step, not from scratch"
      },
      {
        "title": "Streamlit",
        "detail": "Interface for generating and viewing videos"
      }
    ],
    "results": [
      "Cut OpenAI spend 40% and runtime 60%, benchmarked on identical inputs",
      "Reached a 95% completion rate across 50+ media files",
      "Eliminated full-pipeline reruns on failure through persisted agent state"
    ],
    "learnings": "In multi-agent systems, reliability is a design choice. Retries, fallbacks, and saved state at each agent boundary mattered as much as the agents themselves."
  },
  {
    "id": "memory-augmented-ai",
    "title": "Memory-Augmented Conversational AI System",
    "category": "AI & ML",
    "featured": false,
    "summary": "Benchmarked 4 classifiers on OpenAI embeddings for a memory-augmented conversational AI system, with XGBoost reaching 97% held-out accuracy. Traced a 20-point LLM accuracy gap to mislabeled training data, not the model, and fixed it with better prompts.",
    "tags": [
      "Python",
      "XGBoost",
      "OpenAI API",
      "Pinecone"
    ],
    "metrics": [
      {
        "value": "97%",
        "label": "XGBoost accuracy"
      },
      {
        "value": "80% → 87.5%",
        "label": "LLM accuracy"
      },
      {
        "value": "6",
        "label": "evaluation metrics"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "The LLM classifier was lagging about 20 points behind, and prompt changes were being judged by gut feel instead of measurement.",
    "approach": "I benchmarked four classifiers on 1,536-dimension OpenAI embeddings, with XGBoost coming out on top. When the LLM lagged, I dug in and found the gap came from conflated severity labels in the training data, not model capacity. I rewrote the prompts with explicit severity rubrics and built a reusable six-metric evaluation harness so every prompt change could be measured.",
    "architecture": [
      {
        "title": "Conversations",
        "detail": "Input text to classify"
      },
      {
        "title": "Embeddings",
        "detail": "1,536-dimension OpenAI embeddings"
      },
      {
        "title": "Pinecone",
        "detail": "Vector memory store"
      },
      {
        "title": "Classifiers",
        "detail": "4 models benchmarked, XGBoost selected"
      },
      {
        "title": "Evaluation Harness",
        "detail": "6 metrics to measure every prompt change"
      }
    ],
    "results": [
      "XGBoost reached 97% held-out accuracy",
      "Diagnosed the 20-point LLM gap as a labeling issue, not a model issue",
      "Raised LLM classification accuracy from 80% to 87.5% with rubric-based prompts",
      "Made prompt changes measurable with a reusable 6-metric evaluation harness"
    ],
    "learnings": "The biggest accuracy gain came from fixing the labels and the instructions, not from a bigger model. Measuring every prompt change turned prompt engineering from guesswork into experiments."
  },
  {
    "id": "multi-llm-financial-assistant",
    "title": "Multi-LLM Financial Analysis Assistant",
    "category": "AI & ML",
    "featured": false,
    "summary": "Built a cost-aware assistant that routes each finance question to GPT-4o, Claude, or Gemini based on complexity. It blends stock technical indicators with Reddit sentiment into one signal, with responses under 5 seconds.",
    "tags": [
      "Python",
      "LangChain",
      "OpenAI",
      "Claude",
      "Gemini",
      "Streamlit"
    ],
    "metrics": [
      {
        "value": "<5s",
        "label": "response latency"
      },
      {
        "value": "3",
        "label": "LLMs routed by complexity"
      },
      {
        "value": "200+",
        "label": "posts hand-labeled for validation"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Sending every query to the most powerful model is slow and expensive, and price data alone misses what the market is feeling.",
    "approach": "I built a router that sends simple questions to cheaper models and complex ones to stronger models. Technical indicators from yfinance are combined with Reddit sentiment into a weighted composite signal. Parallel API calls and cached ticker data keep responses fast, and I validated sentiment scoring against 200+ hand-labeled posts.",
    "architecture": [
      {
        "title": "User Query",
        "detail": "Finance questions in plain language"
      },
      {
        "title": "LLM Router",
        "detail": "Sends each query to GPT-4o, Claude, or Gemini by complexity"
      },
      {
        "title": "Market Data",
        "detail": "yfinance technical indicators, cached by ticker"
      },
      {
        "title": "Sentiment",
        "detail": "Reddit posts scored via PRAW"
      },
      {
        "title": "Composite Signal",
        "detail": "Weighted stock signal shown in Streamlit"
      }
    ],
    "results": [
      "Routed queries across GPT-4o, Claude, and Gemini by task complexity",
      "Fused technical indicators and Reddit sentiment into composite stock signals",
      "Held end-to-end latency under 5 seconds with parallel calls and caching",
      "Exposed model disagreement on ambiguous text by validating against 200+ labeled posts"
    ],
    "learnings": "Validating against hand-labeled data showed exactly where models disagree, mostly on ambiguous posts. AI output always needs a ground-truth check."
  },
  {
    "id": "eeg-classification",
    "title": "EEG Classification Model",
    "category": "AI & ML",
    "featured": false,
    "summary": "Built a deep learning pipeline combining CNN and Bidirectional LSTM models to classify EEG signals into seizure and non-seizure states. Reached 88% test accuracy on samples from the CHB-MIT and Bonn datasets.",
    "tags": [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "SciPy",
      "CNN",
      "LSTM"
    ],
    "metrics": [
      {
        "value": "88%",
        "label": "test accuracy"
      },
      {
        "value": "0.88",
        "label": "macro precision & recall"
      },
      {
        "value": "4",
        "label": "EEG classes"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "EEG signals are noisy and complex, which makes it hard to reliably tell seizure activity apart from normal brain activity.",
    "approach": "I cleaned the signals with Butterworth bandpass filtering and extracted time-domain and frequency-domain features using SciPy. I then trained CNN and Bidirectional LSTM models, using dropout, batch normalization, and early stopping to keep them from overfitting.",
    "architecture": [
      {
        "title": "EEG Data",
        "detail": "400 samples from the CHB-MIT and Bonn datasets"
      },
      {
        "title": "Filtering",
        "detail": "Butterworth bandpass to reduce signal noise"
      },
      {
        "title": "Feature Extraction",
        "detail": "RMS, skewness, kurtosis, spectral entropy, max power frequency"
      },
      {
        "title": "Deep Learning",
        "detail": "CNN + Bidirectional LSTM architecture"
      },
      {
        "title": "Evaluation",
        "detail": "Accuracy, precision, and recall across 4 classes"
      }
    ],
    "results": [
      "Achieved 88% test accuracy classifying seizure vs non-seizure states",
      "Reached 0.88 macro-average precision and recall across all four EEG classes (F, O, S, Z)",
      "Reduced signal noise with bandpass filtering before modeling"
    ],
    "learnings": "Clean preprocessing and good features did a lot of the heavy lifting before the model ever saw the data."
  },
  {
    "id": "food-access-affordability",
    "title": "Operational Analysis of Food Access & Affordability",
    "category": "Analytics & BI",
    "featured": false,
    "summary": "Analyzed how income inequality and rising food prices affect access to a healthy diet, globally and in California. Turned the findings into an interactive web dashboard built for policy audiences.",
    "tags": [
      "Excel",
      "Datawrapper",
      "Flourish",
      "Data Storytelling"
    ],
    "metrics": [
      {
        "value": "Global + CA",
        "label": "analysis scope"
      },
      {
        "value": "Multi-source",
        "label": "datasets combined"
      },
      {
        "value": "1",
        "label": "interactive stakeholder dashboard"
      }
    ],
    "github": "",
    "liveLink": "",
    "screenshot": "",
    "problem": "Food affordability data is scattered across economic and food-environment sources, making it hard for policymakers to see who is most at risk of nutritional insecurity.",
    "approach": "I combined cost-of-diet metrics, income benchmarks, and spending gaps from multiple public datasets to quantify how prices and inequality affect access to a healthy diet. I then built the findings into an end-to-end data story, using Datawrapper and Flourish to create a web dashboard that walks policy audiences through the insights.",
    "architecture": [
      {
        "title": "Public Datasets",
        "detail": "Cost-of-diet, income, and food-environment data"
      },
      {
        "title": "Excel",
        "detail": "Cleaning, benchmarks, and spending-gap calculations"
      },
      {
        "title": "Analysis",
        "detail": "Identifying the most vulnerable populations"
      },
      {
        "title": "Datawrapper + Flourish",
        "detail": "Interactive charts"
      },
      {
        "title": "Web Dashboard",
        "detail": "Stakeholder-friendly data story"
      }
    ],
    "results": [
      "Quantified how income inequality and rising food prices affect healthy diet access",
      "Identified the populations most vulnerable to nutritional insecurity",
      "Delivered a stakeholder-friendly web dashboard with policy-relevant narratives"
    ],
    "learnings": "For policy audiences, the story matters as much as the numbers. Ordering the charts as a narrative made the findings much easier to act on."
  }
];
