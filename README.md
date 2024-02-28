# Module 14: Belly Button Challenge

## What is the project expected to deliver?
Project deliverables
 - Buid an interactive dashboard to visualise Belly Button Biodiversity dataset, which catalogs the microbes that colonize belly buttons in humans
 - Dashboard to have 4 key visualisation tools
    1. Horizontal bar graph
    2. Bubble chart
    3. Matadata
    4. Gauge dial

## What tools and steps were followed to execute the challenge?
- Tools used Javascript/ D3/ HTML/ Plotly
- App was successfully deployed to Github pages

## Key Steps
#### **JSON Data**
Used D3 to read in sample JSON data from a sample [url](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

#### **Populated Dropdown**
 The dropdown menu had options for 150 IDS from individuals in the sample data.

#### **Horizontal Bar Chart**
Created a horizontal bar chart with a dropdown menu to display the top 10 microbial species (also called operational taxonomic units, or OTUs) found in each sample individual.

#### **Bubble Chart**
Created a bubble chart that displayed the OTU values for each selected individual wtih a marker for bubble size and an OTU label on hover.

#### **Metadata**
Showed demographic data for each selected individual, displayed as key:value pairs.

#### **Bonus**
Created a gauge chart that displayed the weekly washing frequency of the selected individual. The data was filtered from<br>
`metadata.wfreq` in the json data.
The example gauge code was modified to account for values ranging from 0 through 9.

### **Deploying website to Github pages**
 - Go to settings. Then pages. Select main branch and root folder.
 - Save. Go to code. On clicking a yellow button and once thejob is completed, go to pages.
 - The website is deployed in the link as below
 - https://sameer280767.github.io/belly-button-challenge/ 

